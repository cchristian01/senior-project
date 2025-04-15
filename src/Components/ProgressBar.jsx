import React from 'react'

const ProgressBar = ({barName}) => {
  return (
    <div className='h-20 w-100 -mt-15 mb-15'>
    <h1 className='m-3 font-bold'>{barName} Progress Bar</h1>
    <div className='flex justify-start gap-2 m-3'>
    <div className="border-1 w-30 h-5">
        <div className=' h-full w-2 h-5 bg-black'></div>

    </div>
    <span className='text-md -mt-1'>0%</span>
    </div>
    

    </div>
  )
}

export default ProgressBar