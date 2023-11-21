import { UserInfo } from '@/lib/magic/user'
import { MarriagePlay, MarriageWinner } from '@/types/marriage'
import { analytics, auth, functions } from '@/utils/firebase'
import { logEvent } from 'firebase/analytics'
import { httpsCallable } from 'firebase/functions'

type Response = {
  success: boolean
  winner: MarriageWinner
}

export async function updateMarriageScoreTrackerFirebase(
  gameId: string,
  plays: Record<string, MarriagePlay>
): Promise<MarriageWinner> {
  let winner: MarriageWinner = {} as MarriageWinner

  // After update a game in the frontend, call the Firebase function
  const updateMarriageScoreTrackerFunction = httpsCallable(
    functions,
    'updateMarriageScoreTracker'
  )

  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem('userInfo') ?? '{}'
  )
  try {
    const token = await auth.currentUser?.getIdToken(true)
    const response = await updateMarriageScoreTrackerFunction({
      authToken: token,
      gameId,
      plays
    })
    const data = response.data as Response
    if (data.success) {
      console.log('Update the new game successfully')
      winner = data.winner
      // Log the event to firebase
      if (analytics) {
        logEvent(
          analytics,
          `updateMarriageScoreTracker: successful for user ${userInfo} with Game Id: ${gameId}`
        )
      }
    } else {
      const errMessage =
        'Error updating the marriage score tracker in the backend. Please try again'
      console.error(errMessage)
      if (analytics) {
        logEvent(
          analytics,
          `updateMarriageScoreTracker: failure for user ${userInfo} with error: ${errMessage}`
        )
      }
      throw new Error(errMessage)
    }
  } catch (error) {
    const errMessage = `Error updating the marriage score tracker in the backend: ${error}`
    console.error(errMessage)
    if (analytics) {
      logEvent(
        analytics,
        `updateMarriageScoreTracker: failure for user ${userInfo} with error: ${errMessage}`
      )
    }
  }
  return winner
}
