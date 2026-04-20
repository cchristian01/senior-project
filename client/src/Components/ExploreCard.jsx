import React from 'react'

const ExploreCard = ({info, image}) => {
  return (
    <div className="h-100 w-55 md:h-95 bg-gray-50 dark:bg-black dark:text-white rounded-xl shadow-lg md:w-75 m-auto p-8 ml-2 md:m-30">
        <div className="border-4 rounded-xl h-[80%] w-[80%] md:h-[40%] mb-15 md:mb-10 md:w-60"><img className='w-full h-full'src={image}/></div>
        <div className="text-center w-35 md:w-55">
        <p className="font-[Oswald] text-[95%] rounded-xl font-bold  text-xs md:text-md w-full">{info}</p>
        </div>

        
    </div>
  )
}

export default ExploreCard