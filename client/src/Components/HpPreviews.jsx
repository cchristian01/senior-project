import React from 'react'
import PreviewCard from './PreviewCard.jsx'
import image from '../assets/ln-ss4.png'
import image2 from '../assets/ln-ss5.png'
import image3 from '../assets/ln-ss6.png'

const HpPreviews = () => {
  return (
    <div className="text-center  w-full">
    <div className="grid grid-cols-3">
        <PreviewCard image={image}/>
        <PreviewCard image={image2}/>
        <PreviewCard image={image3}/>
    </div>
    </div>
  )
}

export default HpPreviews