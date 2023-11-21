import { UserInfo } from '@/lib/magic/user'
import { analytics, auth, functions } from '@/utils/firebase'
import { logEvent } from 'firebase/analytics'
import { httpsCallable } from 'firebase/functions'

type Response = {
  success: boolean
  deletedGameIDs: string[]
}

export async function deleteMarriageScoreTrackerFirebase(
  docIds: string[]
): Promise<string[]> {
  let deletedGameIDs: string[] = []
  const deleteGamesFunction = httpsCallable(
    functions,
    'deleteMarriageScoreTracker'
  )

  const userInfo: UserInfo = JSON.parse(
    localStorage.getItem('userInfo') ?? '{}'
  )
  try {
    const token = await auth.currentUser?.getIdToken(true)
    const response = await deleteGamesFunction({
      authToken: token,
      docIds
    })
    const data = response.data as Response
    if (data.success) {
      console.log('Deleted Games successfully')
      deletedGameIDs = data.deletedGameIDs
      // Log the event to firebase
      if (analytics) {
        logEvent(
          analytics,
          `deleteMarriageScoreTracker: successful for user ${userInfo} with Game IDs: ${JSON.stringify(
            data.deletedGameIDs,
            null,
            4
          )}`
        )
      }
    }
  } catch (error) {
    const errMessage = `Error deleting Game in the backend: ${error}`
    console.error(errMessage)
    if (analytics) {
      logEvent(
        analytics,
        `deleteMarriageScoreTracker: failure for user ${userInfo} with error: ${errMessage}`
      )
    }
  }
  return deletedGameIDs
}
