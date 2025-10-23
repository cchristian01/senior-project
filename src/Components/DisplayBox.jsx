import React from 'react'

const DisplayBox = () => {
  return (
    <>
    <div className='bg-gray-100 rounded-xl text-left h-70 md:h-115 w-90  md:w-110 p-3 md:p-8  shadow-xl z-3'>
      <h1 className='bg-black-600 text-center font-bold text-lg'>Current Chat</h1>
      <h2 className='bg-black-600 text-left font-bold text-lg'>Recipient: </h2>
      <div className='bg-gray-50 rounded-xl w-[0.8] h-[85%] mb-6 m-2 md:m-4'>
          <div className='pt-[80%] pl-[10%] w-full h-[20%] '>
            <input type="text" placeholder='Enter message...'/> <span><button className='text-red-600 pl-[10%] font-bold text-lg cursor-pointer hover:text-xl'>Send</button></span>


          </div>
      </div>
    </div>
    </>
  )
}

export default DisplayBox