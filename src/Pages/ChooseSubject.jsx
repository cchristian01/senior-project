import React from 'react'
import { Link } from 'react-router-dom'
import learningPaths from '../assets/learningPaths.jsx'
import SubjectCard from '../Components/SubjectCard.jsx'
import ProgressBar from '../Components/ProgressBar.jsx'
import TopMenu from '../Components/TopMenu.jsx'
import Footer from '../Components/Footer.jsx'

const ChooseSubject = ({userName}) => {
  const username = localStorage.getItem('usersname')
  return (
    <>


     <div className="text-left">
        <h1 className="text-red-500 font-bold text-3xl">LearnNow</h1> 
        
        <span> <img/> </span>

        <TopMenu />
        
        
        <div className="text-right"><Link to="/"><button className="cursor-pointer bg-black hover:bg-gray-700 mr-2 mt-5 md:mt-10 md:mr-5 text-white font-bold rounded-lg shadow-lg p-1 md:p-3 w-20 md:w-35">Logout</button></Link></div>
        </div>
        

    <div className='h-20 text-left'>
         
        <div className="mb-5"><h1 className="text-4xl">Welcome, {username}</h1></div>
        
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



    <div className=' grid grid-cols-4 h-200'  >
        {learningPaths[learningPaths.paths[0]].map((subject) => (
         <Link key={subject} to={`/chooseMode/${subject}`}>
         <SubjectCard name={subject}/>
         </Link>))}



    </div> 

    <Footer />
    </>
  )
}

export default ChooseSubject 