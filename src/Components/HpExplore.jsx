import React from 'react'
import ExploreCard from './ExploreCard.jsx'

const HpExplore = () => {
    const text1="The first step is to choose a learning path. This is for you!!\n You have the control to decide. Start learning whatever you are interested in today!!";
    const text2="We have two different modes to choose from. You can learn with the traditional mode or the game mode.\n Both feature the same curriculum and both earn the same amount of points. Choose the mode you prefer.";
    const text3="Login or create an account if you do not have one to begin. Connect with others to share progress and compete for the highest score!\n You can always redo a course regardless of level or progress. Continuous practice is encouraged. Get started now. We really made learning fun. ";
  return (
    <div className="grid grid-cols-3">

    <ExploreCard info={text1} />
    <ExploreCard info={text2} />
    <ExploreCard info={text3} />

    </div>
  )
}

export default HpExplore