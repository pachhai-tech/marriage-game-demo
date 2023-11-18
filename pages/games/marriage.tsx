import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'
import { useRouter } from 'next/router'

const Marriage = () => {
  const router = useRouter()

  const navigateToOption = (option: string) => {
    // Update the navigation based on the selected option
    switch (option) {
      case 'play-online':
        router.push('/games/marriage/playonline')
        break
      case 'play-against-ai':
        router.push('/games/marriage/playai')
        break
      case 'score-tracker':
        router.push('/games/marriage/scoretracker')
        break
      default:
        console.log('Unknown option')
    }
  }

  return (
    <div className='relative bg-black w-full h-screen overflow-y-auto flex'>
      <SideNavigationMenu />
      <div className='flex-1 overflow-y-auto p-6'>
        <div className='max-w-[1100px] mx-auto'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            Marriage Game Options
          </h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => navigateToOption('play-online')}
            >
              <h2 className='text-xl font-bold'>Play Online</h2>
              <p className='mt-2'>Challenge players from around the world</p>
            </div>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => navigateToOption('play-against-ai')}
            >
              <h2 className='text-xl font-bold'>Play Against AI</h2>
              <p className='mt-2'>Practice your skills against our AI</p>
            </div>
            <div
              className='game-card bg-gray-800 hover:bg-gray-700 text-white p-4 rounded-lg shadow-lg cursor-pointer'
              onClick={() => navigateToOption('score-tracker')}
            >
              <h2 className='text-xl font-bold'>Marriage Score Tracker</h2>
              <p className='mt-2'>Calculate scores easily</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Marriage
