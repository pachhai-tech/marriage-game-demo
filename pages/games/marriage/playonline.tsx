import SideNavigationMenu from '@/components/side-navigation/SideNavigationMenu'

const MarriagePlayOnline = () => {
  return (
    <div className='relative bg-black-0 w-full h-screen overflow-y-auto flex flex-row items-start justify-start'>
      <SideNavigationMenu />
      <div className='self-stretch flex-1 overflow-y-auto flex flex-col items-center justify-start p-6 text-left text-base text-white-1 font-kumbh-sans'>
        <div className='w-full flex flex-col items-start justify-start pt-0 px-0 pb-[50px] box-border gap-[24px] max-w-[1100px] text-left text-base text-white-1 font-kumbh-sans'>
          <h1 className='text-4xl font-semibold text-white mb-8'>
            MarriagePlayOnline
          </h1>
        </div>
      </div>
    </div>
  )
}

export default MarriagePlayOnline
