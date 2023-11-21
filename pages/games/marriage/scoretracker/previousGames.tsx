import BiDataCard from '@/components/common/BiDataCard'
import Button from '@/components/common/Button'
import DataTable from '@/components/common/DataTable'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import GamesButton from '@/components/games/marriage/GamesButton'
import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { deleteMarriageScoreTrackerFirebase } from '@/lib/firebase/functions/deleteMarriageScoreTracker'
import { getMarriageScoreTrackerFirebase } from '@/lib/firebase/functions/getMarriageScoreTracker'
import {
  TotalStats,
  getUserStatsFirebase
} from '@/lib/firebase/functions/getUserStatsFirebase'
import { MarriageScoreTracker } from '@/types/marriage'
import { useEffect, useRef, useState } from 'react'

const PreviousGames = () => {
  const [totalStats, setTotalStats] = useState<TotalStats>({
    totalUsers: 0,
    userStats: {
      marriageScoreTracker: 0
    },
    appStats: {
      marriageScoreTracker: 0
    }
  })

  const [gameRows, setGameRows] = useState([] as MarriageScoreTracker[])
  const [selectedItems, setSelectedItems] = useState(
    [] as MarriageScoreTracker[]
  )
  const [lastDocId, setLastDocId] = useState<string | null>(null)
  const [moreGamesToFetch, setMoreGamesToFetch] = useState(false)
  const [isProcessingDelete, setIsProcessingDelete] = useState(false)

  const isGamesFetched = useRef(false)

  useEffect(() => {
    const refreshStats = async () => {
      setTotalStats(await getUserStatsFirebase())
    }
    refreshStats()
  }, [gameRows])

  const fetchGames = async () => {
    const itemsPerPage = 50
    const games = await getMarriageScoreTrackerFirebase({
      self: true,
      query: {},
      itemsPerPage,
      startAfterDoc: lastDocId,
      fetchEverything: false
    })
    if (games.length > 0) {
      setGameRows((prevState) => [...prevState, ...games])
      setLastDocId(games[games.length - 1].docId)
      setMoreGamesToFetch(games.length === itemsPerPage)
    } else {
      setLastDocId(null)
      setMoreGamesToFetch(false)
    }
  }

  useEffect(() => {
    setGameRows([])
    const fetchAndProcessGames = async () => {
      if (!isGamesFetched.current) {
        isGamesFetched.current = true
        await fetchGames() // Wait for fetchGames to complete
        isGamesFetched.current = false
      }
    }

    fetchAndProcessGames()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Handler for the "Load More" button
  const handleLoadMore = async () => {
    await fetchGames()
  }

  const handleSelectionChange = (selectedRows: { [key: string]: boolean }) => {
    // Filter the gameRows to get only those that are selected.
    const newSelectedItems = gameRows.filter(
      (game: MarriageScoreTracker) => selectedRows[game.docId]
    )
    setSelectedItems(newSelectedItems)
  }

  const handleDelete = async () => {
    setIsProcessingDelete(true)
    const idsToRemove = new Set(selectedItems.map((item) => item.docId))

    const deletedGameIds: string[] = await deleteMarriageScoreTrackerFirebase(
      Array.from(idsToRemove)
    )
    // Exclude games from gameRows that are in deletedGames
    const filteredNewGames: MarriageScoreTracker[] = gameRows.filter(
      (gameItem) => !deletedGameIds.includes(gameItem.docId)
    )

    setGameRows(filteredNewGames)
    setSelectedItems([]) // Clear the selected items

    setIsProcessingDelete(false)
  }

  if (isProcessingDelete) {
    return <LoadingSpinner loadingText='Deleting your selected games...' />
  }

  return (
    <div className='relative bg-black-0 w-full h-screen overflow-y-auto flex flex-row items-start justify-start'>
      <SideNavigationMenu />
      <div className='self-stretch flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 text-left text-base text-white-1 font-kumbh-sans'>
        <div className='w-full flex flex-col items-start justify-start pt-0 px-0 pb-[50px] box-border gap-[24px] max-w-[1100px] text-left text-base text-white-1 font-kumbh-sans'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            Previous Games
          </h1>
          <div className='self-stretch flex flex-row flex-wrap items-start justify-start gap-[28px] text-left text-lg text-white-1 font-kumbh-sans'>
            <BiDataCard
              title='My Games'
              value={totalStats.userStats.marriageScoreTracker}
            />
            <BiDataCard
              title='Games Selected'
              value={`${selectedItems.length}/${totalStats.userStats.marriageScoreTracker}`}
            />
          </div>
          {selectedItems.length > 0 ? (
            <DataTable
              title='Your Games'
              titleContainers={[
                <GamesButton
                  key='delete-games-button'
                  title='Delete Games'
                  onClick={handleDelete}
                  disabled={selectedItems.length === 0} // Button is disabled when no items are selected
                />
              ]}
              rows={gameRows}
              isSelectable={true}
              onSelectionChange={handleSelectionChange}
            />
          ) : (
            <DataTable
              title='Your Games'
              rows={gameRows}
              isSelectable={true}
              onSelectionChange={handleSelectionChange}
            />
          )}
          {/* Conditionally render the Load More button */}
          {moreGamesToFetch && (
            <Button title='Load More' onClick={handleLoadMore} />
          )}
        </div>
      </div>
    </div>
  )
}

export default PreviousGames
