import { MarriageScoreTracker } from '@/types/marriage'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import IntoriIcon from '../icons/IntoriIcon'
import CheckboxAction from './CheckboxAction'
import DateFormatter from './DateFormatter'

interface Props {
  id: string
  gameDetail: MarriageScoreTracker
  onSelect: (isSelected: boolean) => void
  isChecked: boolean
  isSelectable?: boolean
}

const DataRow: NextPage<Props> = ({
  id,
  gameDetail,
  onSelect,
  isChecked,
  isSelectable
}) => {
  const router = useRouter()

  const handleRowClick = () => {
    router.push({
      pathname: `/games/marriage/scoretracker/${id}`,
      query: { backToUrl: '/games/marriage/scoretracker/previousGames' }
    })
  }

  const handleCheckboxChange = () => {
    onSelect(!isChecked)
  }

  return (
    <div className='self-stretch rounded-mini flex flex-row items-start justify-start py-3 px-6 gap-[31px] text-left text-xs text-white-1 font-kumbh-sans'>
      <div className='self-stretch flex flex-row items-start justify-start'>
        {isSelectable && (
          <CheckboxAction
            boxSizing='border-box'
            isChecked={isChecked}
            handleCheckboxChange={handleCheckboxChange}
          />
        )}
      </div>

      <div className='flex-1 overflow-hidden flex flex-row items-center justify-start py-0 pr-[7px] pl-0'>
        <div className='overflow-hidden flex flex-row items-start justify-start py-0 pr-[7px] pl-0 box-border gap-[20px] max-w-[500px] text-left text-xs text-white-0 font-kumbh-sans flex-1'>
          <IntoriIcon flexShrink='0' width='46px' height='46px' />
          <div onClick={handleRowClick} className='cursor-pointer'>
            <div className='flex-1 overflow-hidden flex flex-col items-start justify-center gap-[5px]'>
              <div className='relative font-semibold'>{gameDetail.docId}</div>
              <div className='self-stretch relative text-white-1'>
                {gameDetail.winner
                  ? `Winner: ${gameDetail.winner.playerName}`
                  : 'Game ongoing'}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='w-[400px] flex flex-row items-center justify-between'>
        <div className='relative inline-block w-[98px] shrink-0'>
          {gameDetail.settings.numPlayers}
        </div>
        <div className='relative inline-block w-[98px] shrink-0'>
          {`${gameDetail.settings.pointRate} ${gameDetail.settings.currency}`}
        </div>
        <div className='relative inline-block w-[98px] shrink-0'>
          <DateFormatter dateStr={gameDetail.createdAt} showFullDate={true} />
        </div>
        <div className='relative inline-block w-[98px] shrink-0'>
          <DateFormatter dateStr={gameDetail.updatedAt} showFullDate={true} />
        </div>
      </div>
    </div>
  )
}

export default DataRow
