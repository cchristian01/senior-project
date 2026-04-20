import React from 'react'
import { Link } from 'react-router-dom'

const PreviewCard = ({image}) => {
  return (
    <div className=" mt-25 md:mt-10 w-50 md:m-auto h-45 md:w-80 md:h-65 m-5 bg-red-500 border-none shadow-xl">
      <div className="border-4 rounded-xl h-[90%] w-[80%] m-auto md:h-[50%] mb-15 md:mb-10 md:w-60">
        <img className='w-full h-full' src={image}/>
        </div>
        <div className=" h-full w-full text-center" >
            <button className=" mt-1 md:mt-5 rounded-lg  w-40 top-200 px-2 py-1 text-white font-bold bg-red-300"><Link to="/login">Explore</Link></button>
        </div>

    </div>
  )
}

export default PreviewCard