import { COLORS } from '@/lib/colors'
import type { NextPage } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import MenuButton from './MenuButton'

const MiddleNav: NextPage = () => {
  const { pathname } = useRouter()

  return (
    <div className='h-[296px] flex flex-col items-start justify-between lg:items-start lg:justify-between lg:gap-[0px]'>
      <Link
        href='/dashboard'
        className='no-underline outline-none visited:text-current'
      >
        <MenuButton
          iconSrc='/logo.svg'
          labelText='Dashboard'
          buttonWidth='192px'
          buttonBackgroundColor={
            pathname === '/dashboard' ? COLORS['black-3'] : 'unset'
          }
          buttonBorder='unset'
          navInnerContentContainerWidth='unset'
          menuNavTextColor={
            pathname === '/dashboard' ? COLORS['white-0'] : COLORS['white-1']
          }
        />
      </Link>

      <Link
        href='/settings'
        className='no-underline outline-none visited:text-current'
      >
        <MenuButton
          iconSrc='/logo.svg'
          labelText='Settings'
          buttonWidth='192px'
          buttonBackgroundColor={
            pathname === '/settings' ? COLORS['black-3'] : 'unset'
          }
          buttonBorder='unset'
          navInnerContentContainerWidth='unset'
          menuNavTextColor={
            pathname === '/settings' ? COLORS['white-0'] : COLORS['white-1']
          }
        />
      </Link>
    </div>
  )
}

export default MiddleNav
