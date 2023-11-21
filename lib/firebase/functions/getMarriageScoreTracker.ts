import { MarriageScoreTracker } from '@/types/marriage'
import { analytics, auth, functions } from '@/utils/firebase'
import { logEvent } from 'firebase/analytics'
import { httpsCallable } from 'firebase/functions'

type Response = {
  success: boolean
  games: MarriageScoreTracker[]
}

async function fetchAllGamesRecursive(
  options: {
    self: boolean
    query: { [key: string]: string }
    itemsPerPage: number
    startAfterDoc: string | null
    fetchEverything: boolean
  },
  accumulatedGames: MarriageScoreTracker[] = []
): Promise<MarriageScoreTracker[]> {
  const token = await auth.currentUser?.getIdToken(true)
  const params = {
    authToken: token,
    query: options.query,
    itemsPerPage: options.itemsPerPage,
    startAfterDoc: options.startAfterDoc
  }

  if (options.self) {
    params.query['uid'] = auth.currentUser?.uid as string
  }

  const getMarriageScoreTrackerFunction = httpsCallable(
    functions,
    'getMarriageScoreTracker'
  )

  const response = await getMarriageScoreTrackerFunction(params)
  const result: Response = response.data as Response

  if (!result.success) {
    console.error('Failed to fetch Marriage Game Scores')
    // Log the event to firebase
    if (analytics) {
      logEvent(
        analytics,
        `fetchAllGamesRecursive: failure for user: ${auth.currentUser?.uid}: Failed to fetch Marriage Game Scores`
      )
    }

    throw new Error('Failed to fetch Marriage Game Scores')
  }

  const newGames: MarriageScoreTracker[] = result.games
  const newAccumulatedGames = accumulatedGames.concat(newGames)

  if (!options.fetchEverything || newGames.length === 0) {
    // No more documents to fetch
    return newAccumulatedGames
  }

  // Use the last document ID as the starting point for the next fetch
  const lastDocId: string = newGames[newGames.length - 1].docId
  return fetchAllGamesRecursive(
    { ...options, startAfterDoc: lastDocId },
    newAccumulatedGames
  )
}

export async function getMarriageScoreTrackerFirebase(options: {
  self: boolean
  query: { [key: string]: string }
  itemsPerPage: number
  startAfterDoc: string | null
  fetchEverything: boolean
}): Promise<MarriageScoreTracker[]> {
  return fetchAllGamesRecursive(options)
}
