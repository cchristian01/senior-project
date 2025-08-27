import {React, useState} from 'react'

const InfoCard = ({Subject, num, setNum}) => {
  const [questions, setquestions] = useState(false);
  const changeBool = () => {setquestions(true); setNum(0)}
    const nextInfo = () => {
       setNum(prev => { if(prev < Subject.level1.info.length - 1){return prev + 1} return prev})
    };

    const prevInfo = () => {
        setNum(prev => { if(prev > 0) { return prev - 1} return 0 })
    }
    
    const nextQuestion = () => {
      setNum(prev => { if(prev < 9){return prev + 1} return prev})
      }

      const prevQuestion = () => {
        setNum(prev => { if(prev > 0) { return prev - 1} return 0 })
        }
    
  return  (
    <div className='bg-gray-200 h-80 w-200 font-bold text-xl text-center'>
      
      
        <p className='h-20 text-center mt-25'>{questions? Subject.level1.questions[num] : Subject.level1.info[num]}</p>
        <button className='cursor-pointer p-8 m-2 mt-15 pfont-bold' onClick={questions?prevQuestion: prevInfo}>Back</button>

        <button className='cursor-pointer p-8 m-2 mt-15 font-bold' onClick={questions?nextQuestion: nextInfo}>Next</button>
        {!questions? <button className='cursor-pointer p-8 m-2 mt-15 text-green-600 font-bold' onClick={changeBool} >Continue to Questions</button> : <span></span>}
    </div>
      

  )
}

export default InfoCard