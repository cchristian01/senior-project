import React from 'react'
import {useState, useEffect} from 'react'
import Footer from '../Components/Footer.jsx'

const Leaderboard = () => {
    let data;
    const [leaders, setLeaders] = useState([]);
    useEffect(() => {
    const getLeaders = async () => {

    
    const res = await fetch('http://localhost:5000/api/get-leaders');
    data = await res.json();
    console.log(data);
        setLeaders(data);
    };

    getLeaders();
    }, []);

  return (
    <>
    <div className='text-center mb-18'>
        <h1 className='font-bold text-4xl mt-1 font-bold text-red-600'>LearnNow</h1>
        <h1 className='font-bold text-5xl mt-3 font-bold'>-----Leaderboard-----</h1>

    </div>

    <hr/>

    <div className='h-70 md:h-110 w-90 md:w-105 mt-15 pt-6 text-center rounded-xl m-auto bg-gray-500'>
        <h2 className='font-bold text-xl mb-5 text-white'>Top 5 Highest Scores</h2>
        <div className='bg-gray-700 mb-15 text-white'>
            <ul >
                {leaders.map((leader, idx) =>(
                    <li className='p-3' key={idx}>🏆 {leader.ln_username}: {leader.ln_score}</li>
                ))}
            </ul>
        </div>

    </div>

    <div className='h-60 md:h-80'>

    </div>

    <Footer />
    </>
  )
}

export default Leaderboard