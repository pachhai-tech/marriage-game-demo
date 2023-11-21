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
    <div className='relative bg-black-0 w-full h-screen overflow-y-auto flex flex-row items-start justify-start'>
      <SideNavigationMenu />
      <div className='self-stretch flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 text-left text-base text-white-1 font-kumbh-sans'>
        <div className='w-full flex flex-col items-start justify-start pt-0 px-0 pb-[50px] box-border gap-[24px] max-w-[1100px] text-left text-base text-white-1 font-kumbh-sans'>
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
