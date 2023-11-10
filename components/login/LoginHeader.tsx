import { NextPage } from 'next'

const LoginHeader: NextPage = () => {
  return (
    <div className='self-stretch flex flex-col items-center justify-start gap-[12px] text-center'>
      <img className='relative w-[26px] h-[35px]' alt='' src='/logo.svg' />
      <div className='self-stretch relative font-semibold'>
        Login to Himalayan Gambit
      </div>
      <div className='w-full relative text-sm leading-[22px] font-light text-white-1 inline-block max-w-[300px]'>
        Uniting Peaks and People Through Play
      </div>
    </div>
  )
}

export default LoginHeader
