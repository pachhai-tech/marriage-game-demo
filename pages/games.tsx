import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { useRouter } from 'next/router'

const Games = () => {
  const router = useRouter()

  const handleGameSelect = (game: string) => {
    if (game === 'Marriage') {
      router.push('/games/marriage')
    } else {
      // Handle other games or coming soon action
      alert('This game is coming soon!')
    }
  }

  return (
    <div className='relative bg-black w-full h-screen overflow-y-auto flex'>
      <SideNavigationMenu />
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='max-w-[1100px] mx-auto'>
          <h1 className='text-4xl font-semibold text-white mb-8'>Games</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => handleGameSelect('Marriage')}
            >
              <h2 className='text-xl font-bold'>Marriage</h2>
              <p className='mt-2'>Play the classic card game</p>
            </div>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => handleGameSelect('ComingSoon')}
            >
              <h2 className='text-xl font-bold'>Coming Soon</h2>
              <p className='mt-2'>More games on the way!</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Games
