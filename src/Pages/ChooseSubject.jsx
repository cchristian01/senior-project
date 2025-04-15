import React from 'react'
import { Link } from 'react-router-dom'
import learningPaths from '../assets/learningPaths.jsx'
import SubjectCard from '../Components/SubjectCard.jsx'
import ProgressBar from '../Components/ProgressBar.jsx'
import Footer from '../Components/Footer.jsx'

const ChooseSubject = ({userName}) => {
  return (
    <>
     <div className="text-left">
        <h1 className="text-red-500 font-bold text-3xl">LearnNow</h1> 
        
        <span> <img/> </span>
        <ul>
        <span className='grid grid-cols-4 text-right mr-10'> 
            
                <li>Link 1</li>
                <li>Link 2</li>
                <li>Link 3</li>
                <li>Link 4</li>
            
        </span>
        </ul>
        
        
        <div className="text-right"><Link to="/"><button className="cursor-pointer bg-black hover:bg-gray-700 mr-2 mt-5 md:mt-10 md:mr-5 text-white font-bold rounded-lg shadow-lg p-1 md:p-3 w-20 md:w-35">Logout</button></Link></div>
        </div>
        

    <div className='h-20 text-left'>
         
        <div className="mb-5"><h1 className="text-4xl">Welcome, {userName}</h1></div>
        
        <hr/>
    </div>
    

    <div className='h-70'>
      <div className='flex justify-end'>
        <div className=' w-80 md:w-100 px-2  mr-5 pt-8 md:pt-10 h-25 md:h-30 bg-red-700'>
            <h1 className='text-xl md:text-2xl font-bold text-white text-center'>Current Learning Path: {learningPaths.paths[0]}</h1>
        </div>
      </div>
        
        <ProgressBar barName={learningPaths.paths[0]} />
    </div>


    

    <div className=' grid grid-cols-4 h-200'>
        
         <SubjectCard name={learningPaths[learningPaths.paths[0]][0]} link={"/chooseMode"} /> 
         <SubjectCard name={learningPaths[learningPaths.paths[0]][1]} link={"/chooseMode"} />
         <SubjectCard name={learningPaths[learningPaths.paths[0]][2]} link={"/chooseMode"} />
         <SubjectCard name={learningPaths[learningPaths.paths[0]][3]} link={"/chooseMode"} />
         <SubjectCard name={learningPaths[learningPaths.paths[0]][4]} link={"/chooseMode"} />

    </div> 

    <Footer />
    </>
  )
}

export default ChooseSubject 