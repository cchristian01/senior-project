import React from 'react'
import PreviewCard from './PreviewCard.jsx'

const HpPreviews = () => {
  return (
    <div className="text-center  w-full">
    <div className="grid grid-cols-3">
        <PreviewCard />
        <PreviewCard />
        <PreviewCard />
    </div>
    </div>
  )
}

export default HpPreviews