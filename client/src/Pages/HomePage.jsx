import Header from '../Components/Header.jsx'
import { Link } from 'react-router-dom'

import React from 'react'
import HpExplore from '../Components/HpExplore.jsx'
import HpPreviews from '../Components/HpPreviews.jsx'
import Footer from '../Components/Footer.jsx'


const HomePage = () => {
  return (
    <>
    <div>HomePage</div>
    <Header />

    <div className="text-right">

    
    <Link to="/login"><button className="w-30 h-15 md:w-45 md:h-15 mr-10 border-3 font-bold hover:bg-gray-200 cursor-pointer rounded-lg shadow-lg mt-10 p-3">Login</button></Link>
    
    
    <Link to="/signup"><button className="w-30 h-15 md:w-45 md:h-15 mr-10 border-3 font-bold hover:bg-gray-200 cursor-pointer rounded-lg shadow-lg mt-10 p-3">Signup</button></Link>
    </div>

    <h1 className="w-70 md:tracking-wide text-center m-auto  border-0 font-bold text-red-500  cursor-pointer rounded-lg text-4xl underline mt-10 p-3">Explore</h1>


    <div className="h-160 md:h-300">

    <div className="sticky top-0 h-100 bg-stone-100 mb-10 md:mb-20 md:h-150 ">
    <HpExplore />
    </div>
    
    
    
    <div className="h-30 md:h-70 bg-gray-500 top-120">
        
    </div>
    <div className="h-20 md:h-60 ">

    </div>
    </div>
    <div className=" top-100 h-80  mb-10 md:mb-20 bg-linear-to-l from-red-200 to red-500 ">
    
    <HpPreviews />


    </div>

    {/*
    
    <div className="h-20 mb-100 bg-violet-400">&nbsp;</div>*/}

    <Footer />


    </>
  )
}

export default HomePage