import React from 'react'
import {useState, useEffect} from 'react'

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
    <div>ViewScore
      {score}
    </div>
  )
}

export default ViewScore