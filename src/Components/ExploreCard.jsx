import React from 'react'

const ExploreCard = ({info}) => {
  return (
    <div className="h-100 w-55 md:h-95 bg-gray-50  rounded-xl shadow-lg md:w-75 m-auto p-8 ml-2 md:m-30">
        <div className="border-4 rounded-xl h-20 w-30 md:h-30 mb-15 md:mb-10 md:w-60"></div>
        <div className="text-center w-35 md:w-55">
        <p className="font-[Oswald] rounded-xl font-bold  text-xs md:text-md w-full">{info}</p>
        </div>

        
    </div>
  )
}

export default ExploreCard