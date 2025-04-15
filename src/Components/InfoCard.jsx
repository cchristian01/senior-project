import React from 'react'

const InfoCard = ({infolist, num, setNum}) => {
    const nextInfo = () => {
       setNum(prev => { if(prev < infolist.length - 1){return prev + 1} return prev})
    };

    const prevInfo = () => {
        setNum(prev => { if(prev > 0) { return prev - 1} return 0 })
    }
  return (
    <div className='bg-gray-200 h-80 w-200 font-bold text-xl text-center'>
        <p className='h-20 text-center mt-25'>{infolist[num]}</p>
        <button className='cursor-pointer p-8 m-2 mt-15 pfont-bold' onClick={prevInfo}>Back</button>

        <button className='cursor-pointer p-8 m-2 mt-15 font-bold' onClick={nextInfo}>Next</button>
    </div>
  )
}

export default InfoCard