import {React, useRef, useEffect} from 'react'
import Footer from '../Components/Footer'
import SubjectCard from '../Components/SubjectCard'
import {Link, useParams} from 'react-router-dom'

const GamePage = () => {
    const game1 = "MathRun";
    const iframeRef = useRef(null)
    const {subjName} = useParams();



  return (
    <div className='dark:bg-black'>
     <div className='dark:text-white'>
            <h1 className='font-bold text-4xl my-8'>Games</h1>
        </div>

        <hr className='dark:text-white' />

        <div className=' h-120 md:h-160 mt-10 md:mt-12'>
            <SubjectCard name={game1} link={`/math-game/${subjName}`} />

        </div>

      
    <Footer />
    </div>
  )
}

export default GamePage