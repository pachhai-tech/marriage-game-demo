import Modal from '@/components/games/marriage/Modal'
import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { createMarriageScoreTrackerFirebase } from '@/lib/firebase/functions/createMarriageScoreTracker'
import { GameSettings } from '@/types/marriage'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const MarriageScoreTracker = () => {
  const [isNewGameModalOpen, setIsNewGameModalOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    numPlayers: 5,
    seenPoint: 3,
    unseenPoint: 15,
    pointRate: 0.25,
    currency: 'USD',
    dublee: true,
    dubleePointLess: true,
    dubleeBonusPoint: 5,
    foulPoint: 15,
    foulBonus: 'Next Game'
  } as GameSettings)
  const router = useRouter()

  const handleNewGameInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleNewGameSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logic to create new game, generate ID, and navigate
    console.log(`New game settings: ${JSON.stringify(formValues, null, 4)}`)
    const gameId = await createMarriageScoreTrackerFirebase(formValues)
    setIsNewGameModalOpen(false)
    router.push(`/games/marriage/scoretracker/${gameId}`)
  }

  const navigateToOption = (option: string) => {
    // Update the navigation based on the selected option
    switch (option) {
      case 'previous-games':
        router.push('/games/marriage/scoretracker/previousGames')
        break
      default:
        console.log('Unknown option')
    }
  }

  return (
    <div className='relative bg-black-0 w-full h-screen overflow-y-auto flex flex-row items-start justify-start'>
      <SideNavigationMenu />
      <div className='self-stretch flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 text-left text-base text-white-1 font-kumbh-sans'>
        <div className='w-full flex flex-col items-start justify-start pt-0 px-0 pb-[50px] box-border gap-[24px] max-w-[1100px] text-left text-base text-white-1 font-kumbh-sans'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            Marriage Score Tracker
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => setIsNewGameModalOpen(true)}
            >
              <h2 className='text-xl font-bold'>New Game</h2>
            </div>
          </div>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => navigateToOption('previous-games')}
            >
              <h2 className='text-xl font-bold'>Previous Games</h2>
            </div>
          </div>
          {/* Add other options like Instructions, and About the Game */}
        </div>
      </div>

      <Modal
        isOpen={isNewGameModalOpen}
        onClose={() => setIsNewGameModalOpen(false)}
        title='New Game Settings'
      >
        <form onSubmit={handleNewGameSubmit}>
          <div className='mb-4'>
            <label className='block mb-2'>Number of players:</label>
            <input
              type='number'
              name='numPlayers'
              value={formValues.numPlayers}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Seen Point: 3</label>
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Unseen Point: 15</label>
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Point Rate:</label>
            <input
              type='number'
              name='pointRate'
              value={formValues.pointRate}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Currency:</label>
            <select
              name='currency'
              value={formValues.currency}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded w-full'
            >
              <option value='USD'>USD</option>
              <option value='NPR'>NPR</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Dublee:</label>
            <input
              type='checkbox'
              name='dublee'
              checked={formValues.dublee}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Dublee Point less:</label>
            <input
              type='checkbox'
              name='dubleePointLess'
              checked={formValues.dubleePointLess}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Dublee Bonus Point: 5</label>
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Foul Point</label>
            <input
              type='number'
              name='foulPoint'
              value={formValues.foulPoint}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Foul Bonus:</label>
            <select
              name='currency'
              value={formValues.foulBonus}
              onChange={handleNewGameInputChange}
              className='border p-2 rounded w-full'
            >
              <option value='Next Game'>Next Game</option>
              <option value='Current Game'>Current Game</option>
            </select>
          </div>
          {/* Add other form fields here */}
          <button type='submit' className='bg-blue-500 text-white p-2 rounded'>
            Continue
          </button>
        </form>
      </Modal>
    </div>
  )
}

export default MarriageScoreTracker
