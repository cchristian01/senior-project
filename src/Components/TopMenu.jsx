import React from 'react'
import {Link} from 'react-router-dom'

const TopMenu = () => {
  return (
    <ul>
       <span className='grid grid-cols-4 text-right mr-10'> 
           
            <Link to="/leaderboard"><button className='cursor-pointer'><li>Leaderboard</li></button></Link>
            <Link to="/view-score"><li>View Score</li></Link>
            <Link to="/chat"><button className='cursor-pointer'><li>Chat</li></button></Link>
            <li>Settings</li>
           
       </span>
    </ul>
  )
}

export default TopMenu