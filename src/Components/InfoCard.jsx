import {React, useState} from 'react'
 
const InfoCard = ({Subject, num, setNum}) => {
  const [questions, setquestions] = useState(false);
  const changeBool = () => {setquestions(true); setNum(0)}
  const [results, setResults] = useState(false);
  const [level, increaseLevel] = useState(1);
  const part = "level" + level;
    const nextInfo = () => {
       setNum(prev => { if(prev < Subject[`${part}`].info.length - 1){return prev + 1} return prev})
    };

    const prevInfo = () => {
        setNum(prev => { if(prev > 0) { return prev - 1} return 0 })
    }
    
    const nextQuestion = () => {
      setNum(prev => { if(prev < 9){return prev + 1} return prev})
      setAnswer('');
    }

      const prevQuestion = () => {
        setNum(prev => { if(prev > 0) { return prev - 1} return 0 })
        }
        const [answers, setAnswers] = useState([]);
        const [answer, setAnswer] = useState('');
    const handleSubmit = (e) =>{
      alert('Answer Submitted!')
      e.preventDefault();
      setAnswers((prevAnswers) => [...prevAnswers, (answer)]);
    }
    const countMatches = (list1, list2) => {
      let count = 0;
      for(let i = 0; i < 10; ++i){
        if(list1[i] == list2[i]){
          count += 1;
        }
      }
      console.log(list1)
      console.log(list2)
      return count;
    }
    const correctNum = countMatches(Subject[`${part}`].answers, answers);
    let total = {
      1: 0,
      2: 0,
      3: 0,
      4: 0
    };
    if(level > 1 ) {
      total = JSON.parse(localStorage.getItem('totalObj'));
    }
    let totalsSum;
    const calculateSum = () => {
    const sum = Object.values(total).reduce((accumulator, currentVal) => {
        return accumulator + currentVal;
    }, 0);

    return sum;
  }

  totalsSum = calculateSum();


    
    const handleSave = async () => {
      if(correctNum > total[level]){
        total[level] = correctNum;
        console.log("current correctNum: ", correctNum);
        const newTotal = calculateSum();

       const data =  JSON.parse(localStorage.getItem('courseData'));
       console.log(data)
        if( data.result.length == 0 || newTotal > data.result[0]?.points_earned){
          console.log("yes")
          console.log(data.result);
          const updateBool = (newTotal > data.result[0]?.points_earned);
           const res = await fetch('http://localhost:5000/api/update-score', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
            subj: parseInt(data.subjId),
            path: parseInt(data.pathId),
            user: parseInt(data.userId),
            newScore: parseInt(newTotal),
            update: parseInt(updateBool),

          })
        })
        if(res.ok){
          console.log("good")
        }
        }
      }


    }
    function getResponse (score) 
      {
        let retVal = "";
        if(score < 7) 
        {
          retVal = "Not Great! Keep Practicing."
        }
        else {         
          retVal = "Good Job!"
        }
        return retVal;
    };
    
    const showResults = () => {
      setResults(true);
      //if(correctNum > JSON.parse(localStorage.getItem('totalObj')[level])){
      total[level] = correctNum;
      //}
      localStorage.setItem('totalPoints', totalsSum);
      localStorage.setItem('totalObj', JSON.stringify(total));
      
      const savedTotalObj = JSON.parse(localStorage.getItem('totalObj'));
      console.log('current total:', savedTotalObj[level]);
      if(level > 1) {
        console.log('level below total:',savedTotalObj[level - 1]);

      }
      console.log(savedTotalObj);
      console.log('total correct: ', calculateSum())
      
    }
    const tryAgain = () => {
      setResults(false);
      setNum(0);
      setAnswers([]);
    };

    const nextLesson = () => {
      increaseLevel(prev => {if(prev < 4){ return prev + 1} return prev});
      setResults(false);
      setNum(0);
      setAnswers([]);
      setquestions(false);
    };
    console.log(num)
  return  ( results?     <div className='bg-gray-200 h-80 w-200 font-bold text-xl text-center'>
        <p className='h-20 text-center mt-20'>You got {correctNum} / 10 right, {getResponse(correctNum)}</p>
        <button className='cursor-pointer p-8 m-2 mt-15 text-red-600 font-bold' onClick={tryAgain}>Try Again</button>
        <button className='cursor-pointer p-8 m-2 mt-15 text-green-600 font-bold' onClick={nextLesson}>Continue to Next Lesson</button>

        </div>:
    <div className='bg-gray-200 h-80 w-200 font-bold text-xl text-center'>
      {questions? <h1>{num + 1}/10</h1>:<h1></h1>}
      
        <p className='h-20 text-center mt-20'>{questions? Subject[`${part}`].questions[num] : Subject[`${part}`].info[num]}
        {questions?
        
        <form onSubmit={handleSubmit} className='h-8'>
          <input type="text" min="0" value={answer} onChange={(e) => setAnswer(e.target.value)} className='h-8 text-center border-3 mt-4'/><br/>
          <button type="submit" className='h-5 text-center text-blue  cursor-pointer'>Submit </button >
        </form>
        : <span></span>}
        </p>
        <button className='cursor-pointer p-8 m-2 mt-15 pfont-bold' onClick={questions?prevQuestion: prevInfo}>Back</button>
        <button onClick={handleSave}>Save</button>

        <button className='cursor-pointer p-8 m-2 mt-15 font-bold' onClick={questions?nextQuestion: nextInfo}>Next</button>
        {!questions? <button className='cursor-pointer p-8 m-2 mt-15 text-green-600 font-bold' onClick={changeBool} >Continue to Questions</button> : <span></span>}
        {questions && num == 9 ? <button className='cursor-pointer p-8 m-2 mt-15 text-blue-600 font-bold' onClick={showResults}>See Results</button>: <span></span>}
    </div>
      

  )
}

export default InfoCard