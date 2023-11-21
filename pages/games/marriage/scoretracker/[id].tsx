import BackButton from '@/components/common/BackButton'
import DateFormatter from '@/components/common/DateFormatter'
import IntoriIcon from '@/components/icons/IntoriIcon'
import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { getMarriageScoreTrackerFirebase } from '@/lib/firebase/functions/getMarriageScoreTracker'
import { MarriageScoreTracker } from '@/types/marriage'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

const ScoreTrackerDetails: NextPage = ({}) => {
  const router = useRouter()
  const { id, backToUrl } = router.query

  const [scoreTracker, setScoreTracker] = useState<MarriageScoreTracker | null>(
    null
  )

  useEffect(() => {
    const fetchGames = async (query: { [key: string]: string }) => {
      const itemsPerPage = 1
      const games = await getMarriageScoreTrackerFirebase({
        self: false,
        query,
        itemsPerPage,
        startAfterDoc: null,
        fetchEverything: false
      })
      if (games.length > 0) {
        setScoreTracker(games[0])
      }
    }

    if (typeof id === 'string') {
      fetchGames({ docId: id })
    } else {
      console.log('Invalid game id: ', id)
      // If no matching credential found or invalid id, redirect to /games/marriage/scoretracker.tsx
      router.push('/games/marriage/scoretracker')
    }
  }, [id, router])

  return (
    <div className='relative bg-black-0 w-full h-screen overflow-y-auto flex flex-row items-start justify-start'>
      <SideNavigationMenu />
      <div className='self-stretch flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 text-left text-base text-white-1 font-kumbh-sans'>
        <div className='w-full flex flex-col items-start justify-start pt-0 px-0 pb-[50px] box-border gap-[24px] max-w-[1100px] text-left text-base text-white-1 font-kumbh-sans'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            Marriage Score Tracker
          </h1>
          {backToUrl && (
            <div className='self-stretch flex flex-col items-start justify-start text-left text-base text-white-1 font-kumbh-sans'>
              <BackButton backTo={backToUrl as string} />
            </div>
          )}

          {scoreTracker && (
            <>
              <IntoriIcon flexShrink='0' width='76px' height='76px' />
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Started by
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.uid}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Number of players
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.numPlayers}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Seen Point
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.seenPoint}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Unseen Point
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.unseenPoint}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Point Rate
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.pointRate}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Currency
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.currency}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Dublee
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {String(scoreTracker.settings.dublee)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Dublee Pointless
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {String(scoreTracker.settings.dubleePointLess)}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Dublee Bonus Point
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.dubleeBonusPoint}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Foul Point
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.foulPoint}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Foul Bonus
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      {scoreTracker.settings.foulBonus}
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Created
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      <DateFormatter
                        dateStr={scoreTracker.createdAt}
                        showFullDate={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className='self-stretch rounded-mini bg-black-1 overflow-hidden flex flex-col items-start justify-start p-6 gap-[15px] text-left text-base text-white-1 font-kumbh-sans border-[1px] border-solid border-black-4'>
                <div className='self-stretch relative font-semibold'>
                  Updated
                </div>
                <div className='self-stretch flex flex-row items-center justify-between text-sm text-grey-2'>
                  <div className='flex-1 flex flex-col items-start justify-start'>
                    <div className='self-stretch relative leading-[150%]'>
                      <DateFormatter
                        dateStr={scoreTracker.updatedAt}
                        showFullDate={true}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ScoreTrackerDetails
