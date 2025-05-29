import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className='relative mt-24'>
        <img src={assets.bottom_banner_image} alt="bottom-banner" className='w-full hidden md:block' />
        <img src={assets.bottom_banner_image_sm} alt="bottom-banner" className='w-full md:hidden' />

        <div className='absolute inset-0 flex flex-col items-center md:items-end  md:justify-center pt-16 md:pt-0 md:pr-24'>
            <div>
                <h1 className='text-2xl md:text-4xl font-semibold text-primary mb-6'>Why We Are Best?</h1>
                {
                    features.map((feature, index) => (
                        <div key={index} className='flex items-center gap-2 mb-4'>
                            <img src={feature.icon} alt={feature.title} className='w-6 h-6 md:w-8 md:h-8' />
                            <div className='flex flex-col items-start md:items-start'>
                            <h3 className='text-base md:text-lg font-medium text-gray-700'>{feature.title}</h3>
                            <p>
                                <span className='text-sm md:text-base text-gray-500'>{feature.description}</span>
                            </p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default BottomBanner
