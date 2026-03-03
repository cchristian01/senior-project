import React from 'react'
import {useState, useEffect} from 'react'
import { Link, useParams} from 'react-router-dom'
import learningPaths from '../assets/learningPaths.jsx'
import SubjectCard from '../Components/SubjectCard.jsx'
import ProgressBar from '../Components/ProgressBar.jsx'
import TopMenu from '../Components/TopMenu.jsx'
import Footer from '../Components/Footer.jsx'

const ChooseMode = ({userName}) => {

    const mode1 = "Game Mode";
    const mode2 = "Non Game Mode";

    const { subjName }= useParams();
    const {pathName} = useParams();
    const username = sessionStorage.getItem('usersname');
    const pathProgress = sessionStorage.getItem('pathProgress');
    let data;
    const [subjPercentage, setSubjPercentage] = useState(0);
    const currentPath = pathName.replace(/-/g," ");
    

    const input = {
        subj: subjName,
        path: currentPath,
        user: username,
    };
    console.log(currentPath)
    useEffect (() => {
    const getProgress = async() => {
    const res = await fetch('http://localhost:5000/api/query-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input)
    });

    data = await res.json();
    console.log(data)
    localStorage.setItem('courseData', JSON.stringify(data));
    if(!data.result.length == 0)
     {
        setSubjPercentage(data.result[0].subject_value);
    }

}


    getProgress();
},[]);
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
   <div className='h-40 flex justify-end '>
       <div className=' w-80 md:w-100 px-2  mr-5 pt-8 md:pt-10 h-25 md:h-30 bg-red-700'>
           <h1 className='text-xl md:text-2xl font-bold text-white text-center'>Current Learning Path: {currentPath}</h1>
       </div>
   </div>

    <ProgressBar barName={currentPath} progress={Number(pathProgress)} />
    <ProgressBar barName={subjName} progress={subjPercentage} />

   </div>
   

   <div className=' flex justify-center gap-10 md:gap-30 w-100 md:w-full h-200'>
       
        <SubjectCard name={mode1} link={`/gameMode/${subjName}`} /> 

        <SubjectCard name={mode2} link={`/course/${pathName}/${subjName}`} />




   </div> 

   <Footer />
   </>
  )
}

export default ChooseMode