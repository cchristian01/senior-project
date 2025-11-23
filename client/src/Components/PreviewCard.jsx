import React from 'react'
import { Link } from 'react-router-dom'

const PreviewCard = () => {
  return (
    <div className=" mt-25 md:mt-10 w-50 md:m-auto h-45 md:w-80 md:h-65 m-5 bg-red-500 border-none shadow-xl">
        <img />
        <div className=" h-full w-full text-center" >
            <button className=" mt-35 md:mt-50 rounded-lg  w-40 top-200 px-2 py-1 text-white font-bold bg-red-300"><Link to="/login">Explore</Link></button>
        </div>

    </div>
  )
}

export default PreviewCard