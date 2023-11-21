import type { NextPage } from 'next'
import { useMemo, type CSSProperties } from 'react'

type Props = {
  /** Style props */
  flexShrink?: CSSProperties['flexShrink']
  width?: CSSProperties['width']
  height?: CSSProperties['height']
}

const IntoriIcon: NextPage<Props> = ({ flexShrink, width, height }) => {
  const intoriIconStyle: CSSProperties = useMemo(() => {
    return {
      flexShrink,
      width,
      height
    }
  }, [flexShrink, width, height])

  return (
    <div
      className='rounded-xl bg-black-2 w-[46px] h-[46px] overflow-hidden flex flex-col items-center justify-center p-2.5 box-border'
      style={intoriIconStyle}
    >
      <img className='relative w-[38px] h-[38px]' alt='' src='/logo.svg' />
    </div>
  )
}

export default IntoriIcon
