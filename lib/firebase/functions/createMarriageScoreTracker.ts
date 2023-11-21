import { UserInfo } from '@/lib/magic/user'
import { GameSettings } from '@/types/marriage'
import { analytics, auth, functions } from '@/utils/firebase'
import { logEvent } from 'firebase/analytics'
import { httpsCallable } from 'firebase/functions'

type Response = {
  success: boolean
  newGame: boolean
  gameId: string
}

export async function createMarriageScoreTrackerFirebase(
  gameSettings: GameSettings
): Promise<string> {
  let gameId: string = ''

  // After creating a game in the frontend, call the Firebase function
  const createMarriageScoreTrackerFunction = httpsCallable(
    functions,
    'createMarriageScoreTracker'
  )

  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem('userInfo') ?? '{}'
  )
  try {
    const token = await auth.currentUser?.getIdToken(true)
    const response = await createMarriageScoreTrackerFunction({
      authToken: token,
      gameSettings
    })
    const data = response.data as Response
    if (data.success) {
      console.log('Created a new game successfully')
      gameId = data.gameId
      // Log the event to firebase
      if (analytics) {
        logEvent(
          analytics,
          `createMarriageScoreTracker: successful for user ${userInfo} with Game Id: ${data.gameId}`
        )
      }
    } else {
      const errMessage =
        'Error creating a new marriage score tracker in the backend. Please try again'
      console.error(errMessage)
      if (analytics) {
        logEvent(
          analytics,
          `createMarriageScoreTracker: failure for user ${userInfo} with error: ${errMessage}`
        )
      }
      throw new Error(errMessage)
    }
  } catch (error) {
    const errMessage = `Error creating a new marriage score tracker in the backend: ${error}`
    console.error(errMessage)
    if (analytics) {
      logEvent(
        analytics,
        `createMarriageScoreTracker: failure for user ${userInfo} with error: ${errMessage}`
      )
    }
  }
  return gameId
}
