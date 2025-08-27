import {React, useState} from 'react'
import {useParams} from 'react-router-dom'
import InfoCard from '../Components/InfoCard.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'
import QuestionSection from '../Components/QuestionSection'

const CoursePage = ({subject}) => {
    const {subjName } = useParams();
    const [num, setNum] = useState(0);
    const [component, setComponent] = useState(null);
    let level = 1;
    const course = subjName;
    const subjects = { "Addition": {

        level1: {
        info: ["Single Digit Addition",
            "Addition is an important idea to understand. You will always need to know what number you get when two or more numbers are put together.",
            "Key terms for this lesson are ADD, ADDITION, AMOUNT, SUM",
            "When you have your favorite item let's say it is candy, you can count how many you have, the number you have is the amount",
            "If someone gives you more you have a new amount and this total is called a sum",
            "To know what this new number is you add how many they gave you to how much you had, the act of adding is called addition",
            "Adding is just counting the total number of items and the total is called the sum"
        ],
        questions: ["4 + 3 = ", " 2 + 5 = ", "6 + 2 = ", "3 + 2 = ", "1 + 4 = ", "0 + 0 = ", "0 + 1 = ", "2 + 1 = ", "2 + 2 = ", "3 + 6 = "],
        answers: [7, 7, 8, 5, 5, 0, 1, 3, 4, 9],
        },

        level2: {
            info: ["Multi Digit Column Addition",
                "See, adding is easy. If you can add single digit numbers then you can add multi digit numbers. There is just a simple extra concept you need to understand. As you might know we count numbers using base 10. This means each digit in a number could be one of any of the ten digits 0-9. Key terms for this lesson are ONES PLACE, TENS PLACE, HUNDREDS PLACE, THOUSANDS PLACE, AND CARRY DIGIT",
                "When numbers have more than one digit, the digits that are further left have a higher value and digits that are further right have a lower value. ",
                "The rightmost digit has the lowest value, and is called the ones place. From right to left the next digit is the TENS PLACE, the next is HUNDREDS PLACE, and the leftmost in a 4 digit number is the THOUSANDS PLACE. Numbers do not end but we will only use 4 digit number problems. The same idea can be used to get the sum of bigger numbers.",
                "Numbers with more than one digit are added column by column from right to left and when a sum of a column is bigger than 9, the ONES PLACE digit is the sum for that column and the TENS PLACE DIGIT is a carry digit to the next column to be added with that columns numbers. This represents that the sum of the numbers added is larger than 9 and the CARRY digit is placed in the next column to show that the next highest place value has increased by 1.   "
            ],
            questions: ["20 + 15 = ", "43 + 27 = ", "99 + 6 = ", "420 + 18 = ", "270 + 612 = ", "327 + 289 = ", "1042 + 1022 = ", "71 + 10 = ", "996 + 8127 = ", "4096 + 0 = "],
            answers: [35, 70, 105, 438, 882, 616, 2064, 81, 9123, 4096],
        },

        level3: {
            info: ["Addition Properties & an Alternative Method"],
            questions: [""],
            answers: [],
        },

        test: {
            info: [""],
            questions: [""],
            answers: [],
        },

        },   

        "Subtraction" : {

        },

        "Multiplication" : {

        },

        "Division" : {

        },

        "Fractions" : {

        }
    };
 
    
  return (
    <>

    

    <div>
        <Header />
        <div className='bg-neutral-100 rounded-lg w-full h-20'>
            <h1 className='flex justify-center pt-3 text-3xl font-bold'>{subjName}</h1>
        </div>


    </div>

    <div className='h-150 flex justify-center bg-gray-700'>

    <InfoCard Subject={subjects[subjName]} num={num} setNum={setNum}/> 
  
        
        
    </div>



    <Footer />


    </>


  )
}

export default CoursePage