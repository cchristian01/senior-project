import React from 'react'
import {useState, useEffect} from 'react'
import Footer from '../Components/Footer.jsx'

const ViewScore = () => {
  const username = localStorage.getItem('usersname');
  let data;
  const [score, setScore] = useState(0);
  useEffect(() => {
  const getScore = async() => {
    const res = await fetch('http://localhost:5000/api/get-score', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: username})
    });
    data = await res.json();
    console.log(data);
    setScore(data[0].ln_score);
  };


  getScore();

  }, []);

  return (
    <>
     <div className='text-center mb-18'>
        <h1 className='font-bold text-4xl mt-1 font-bold text-red-600'>LearnNow</h1>
        <h1 className='font-bold text-5xl mt-3 font-bold'>---------------</h1>

    </div>

    <hr />
    <div className='bg-gray-300 relative h-150 md:200 rounded'>
      <div className='bg-white absolute w-full rounded-xl p-3 mt-5 md:mt-8 md:p-5'>
        <table  className='border border-black border-collapse table-auto w-full'>
          <tr>
            <td className='border w-1/2 text-center'><h1 className='font-bold text-4xl'>Your Score</h1></td>
            <td className='border w-1/2 text-center'><h1 className='font-bold text-4xl'>{score}</h1></td>
          </tr>
        </table>
      </div>
    </div>
    <Footer />
    </>
  )
}

export default ViewScore