import {React, useRef, useEffect} from 'react'
import Footer from '../Components/Footer'
import SubjectCard from '../Components/SubjectCard'
import {Link, useParams} from 'react-router-dom'

const GamePage = () => {
    const game1 = "MathRun";
    const iframeRef = useRef(null)
    const {subjName} = useParams();



  return (
    <>
     <div className='bg-yellow-400'>
            <h1 className='font-bold text-4xl my-8'>Games</h1>
        </div>

        <hr />

        <div className=' h-120 md:h-160 mt-10 md:mt-12'>
            <SubjectCard name={game1} link={`/math-game/${subjName}`} />

        </div>

      
    <Footer />
    </>
  )
}

export default GamePage