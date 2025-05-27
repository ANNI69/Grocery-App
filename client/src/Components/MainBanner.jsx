import React from 'react'
import { assets } from '../assets/assets'

const MainBanner = () => {
  return (
    <div className='relative w-full h-[300px] md:h-[400px] lg:h-[500px] xl:h-[600px]'>
      <img className='w-full hidden md:block' src={assets.main_banner_bg} alt="Main Banner" />
      <img className='w-full md:hidden' src={assets.main_banner_bg_sm} alt="Main Banner" />
    </div>
  )
}

export default MainBanner
