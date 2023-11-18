import Modal from '@/components/games/marriage/Modal'
import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { useRouter } from 'next/router'
import { FormEvent, useState } from 'react'

const MarriageScoreTracker = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [formValues, setFormValues] = useState({
    pointRate: 0.25,
    currency: 'USD',
    dublee: true,
    dubleePointLess: true,
    dubleeBonusPoint: 5,
    foulPoint: 15,
    foulBonus: 'Next Game'
  })
  const router = useRouter()

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement
    setFormValues((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Logic to create new game, generate ID, and navigate
    console.log(formValues)
    setIsModalOpen(false)
    // Placeholder for navigation, replace with actual game ID
    router.push('/games/marriage/scoretracker/12345')
  }

  return (
    <div className='relative bg-black w-full h-screen overflow-y-auto flex'>
      <SideNavigationMenu />
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='max-w-[1100px] mx-auto'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            Marriage Score Tracker
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
            <div
              className='bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => setIsModalOpen(true)}
            >
              <h2 className='text-xl font-bold'>New Game</h2>
            </div>
            {/* Add other options like Continue Game, Game History, Instructions, and About the Game */}
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title='New Game Settings'
      >
        <form onSubmit={handleSubmit}>
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
              onChange={handleInputChange}
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Currency:</label>
            <select
              name='currency'
              value={formValues.currency}
              onChange={handleInputChange}
              className='border p-2 rounded w-full'
            >
              <option value='USD'>USD</option>
              <option value='NPR'>NPR</option>
              <option value='GBP'>GBP</option>
              <option value='BTN'>BTN</option>
            </select>
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Dublee:</label>
            <input
              type='checkbox'
              name='dublee'
              checked={formValues.dublee}
              onChange={handleInputChange}
              className='border p-2 rounded'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Dublee Point less:</label>
            <input
              type='checkbox'
              name='dubleePointLess'
              checked={formValues.dubleePointLess}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              className='border p-2 rounded w-full'
            />
          </div>
          <div className='mb-4'>
            <label className='block mb-2'>Foul Bonus:</label>
            <select
              name='currency'
              value={formValues.foulBonus}
              onChange={handleInputChange}
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
