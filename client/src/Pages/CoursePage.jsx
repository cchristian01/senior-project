import {React, useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import InfoCard from '../Components/InfoCard.jsx'
import Footer from '../Components/Footer.jsx'
import Header from '../Components/Header.jsx'
import QuestionSection from '../Components/QuestionSection'

export const CoursePage = ({subject}) => {
    const {subjName } = useParams();
    const [num, setNum] = useState(0);
    const [component, setComponent] = useState(null);
    let level = 1;
    const course = subjName;
    let data;
    useEffect(() => {
        const stored = sessionStorage.getItem('courseData');
        if(stored) {
            data = JSON.parse(stored);
            console.log(`This is data ${data.subjId}`);

        }
    }, [])

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
            questions: ["3 + (8 + 3) = ", "56 + (4 + 2) = ", "40 + 55 + 2 = ", "0 + 16 = ", "210 + 350 = ", "420 + 510 = ", "2031 + 788 + 1 = ", "84 + 15 = ", "300 + 0 = ", 
                "45 + 0 = "
            ],
            answers: [14, 62, 97, 16, 560, 930, 2820, 99, 300, 45],
        },

        level4: {
            info: ["Test Time", "This is the test portion where you will be asked questions from all 3 lessons", "Good luck."],
            questions: ["413 + 726 = ", "550 + 181 = ", "6 + 6 = ", "8 + (3 + 14) + (5 + 177) + 2 = ", "42 + 11 = ", "16 + 5 = ", "3 + 1 = ", "15 + 16 = ", "2 + 0 = ", "(5 + 3231) + 323 = "],
            answers: [1139, 631, 12, 207, 53, 21, 4, 31, 2, 3559],
        },

        },   

        "Subtraction" : {
            level1: {
                info: ["Single Digit Subtraction",
                    "Subtraction is another important idea to understand. Addition & Subtraction are the start of learning math.",
                    "Key terms for this lesson are DIFFERENCE, SUBTRACT, MINUS, TAKE AWAY FROM",
                    "When you have your favorite item let's say it is candy, you can count how many you have, the number you have is the amount",
                    "If someone takes some from you, you then have a new amount which is the difference",
                    "To know what this new number is you subtract how much they took from you from how much you had, the act of subtracting is called subtraction",
                    "Subtracting is just counting the number of items left after some were taken away or lost",
                    "Subtraction uses a minus sign (-) vs the plus sign (+) used for addition"
                ],
                questions: ["4 - 3 = ", " 7 - 5 = ", "6 - 2 = ", "3 - 2 = ", "8 - 4 = ", "0 - 0 = ", "7 - 1 = ", "5 - 1 = ", "2 - 2 = ", "9 - 6 = "],
                answers: [1, 2, 4, 1, 4, 0, 6, 4, 0, 3],
                },
        
                level2: {
                    info: ["Multi Digit Column Subtraction",
                        "See, subtracting is easy. If you can subtract single digit numbers then you can subtract multi digit numbers. There is just a simple extra concept you need to understand. As you might know we count numbers using base 10. This means each digit in a number could be one of any of the ten digits 0-9. Key terms for this lesson are ONES PLACE, TENS PLACE, HUNDREDS PLACE, THOUSANDS PLACE, BORROWING, AND CARRY DIGIT",
                        "When numbers have more than one digit, the digits that are further left have a higher value and digits that are further right have a lower value. ",
                        "The rightmost digit has the lowest value, and is called the ones place. From right to left the next digit is the TENS PLACE, the next is HUNDREDS PLACE, and the leftmost in a 4 digit number is the THOUSANDS PLACE. Numbers do not end but we will only use 4 digit number problems. The same idea can be used to get the difference of bigger numbers.",
                        "Numbers with more than one digit are subtracted column by column from right to left and when the top digit must be greater than the bottom digit if not, a digit is borrowed from the next column to the left if possible without making its value less than the number below it and its value is decreased by one. This is because the number being subtracted resulted in the difference being reduced to the next smallest value in the column to the left. "
                        ,"This is called borrowing and is necessary for subtraction and if the next column to the left is not capable of being borrowed from you continue to the left until a column can be borrwoed from"
                    ],
                    questions: ["20 - 15 = ", "43 - 27 = ", "99 - 6 = ", "420 - 18 = ", "1270 - 612 = ", "327 - 289 = ", "1042 - 1022 = ", "71 - 10 = ", "9960 - 8127 = ", "4096 - 0 = "],
                    answers: [5, 16, 93, 402, 658, 38, 20, 61, 1833, 4096],
                },
        
                level3: {
                    info: ["Subtraction Properties & an Alternative Method"],
                    questions: ["18 - 0 = ", "56 - 0 = ", "40 - 2 = ", "100 - 16 = ", "1210 - 350 = ", "520 - 2 - 510 = ", "2031 - 788 - 1 = ", "84 - 15 - 17 = ", "300 - 0 = ", 
                        "445 - 0 = "
                    ],
                    answers: [18, 56, 38, 84, 860, 8, 1242, 52, 300, 445],
                },
        
                level4: {
                    info: ["Test Time", "This is the test portion where you will be asked questions from all 3 lessons", "Good luck."],
                    questions: ["1413 - 726 = ", "5501 - 181 = ", "6 - 6 = ", "8 - 3 - 2 = ", "42 - 11 = ", "166 - 5 = ", "133 - 1 = ", "155 - 16 = ", "2 - 0 = ", "5241 - 323 = "],
                    answers: [687, 5320, 0, 3, 32, 161, 132, 139, 2, 4918],
                },
        },

        "Multiplication" : {
            level1: {
                info: ["Single Digit Multiplication",
                    "Multiplication is another important idea to understand. You will always need to know what number you get when two or more numbers are multiplied together.",
                    "Key terms for this lesson are MUTIPLY, MULTIPLICATION, PRODUCT, TIMES",
                    "When you have your favorite item let's say it is candy, you can count how many you have, the number you have is the amount",
                    "This amount could be put in a box, if you have the same amount of candy in each box you can multiply the number in the box by the number of boxes",
                    "The result is called the product, this is just a faster way to calculte what would be repeated addition",
                    "Multiplication is repeated addition and products from 1 - 12 can be memorized to make more complex multiplication easier"
                ],
                questions: ["4 x 3 = ", " 2 x 5 = ", "6 x 2 = ", "3 x 2 = ", "1 x 4 = ", "0 x 0 = ", "0 x 1 = ", "2 x 1 = ", "2 x 2 = ", "3 x 6 = "],
                answers: [12, 10, 12, 6, 4, 0, 0, 2, 4, 18],
                },
        
                level2: {
                    info: ["Multi Digit Column Multiplication",
                        "See, multiplying is easy. If you can multiply single digit numbers then you can multiply multi digit numbers. There is just a simple extra concept you need to understand. As you might know we count numbers using base 10. This means each digit in a number could be one of any of the ten digits 0-9. Key terms for this lesson are ONES PLACE, TENS PLACE, HUNDREDS PLACE, THOUSANDS PLACE, AND CARRY DIGIT",
                        "When numbers have more than one digit, the digits that are further left have a higher value and digits that are further right have a lower value. ",
                        "The rightmost digit has the lowest value, and is called the ones place. From right to left the next digit is the TENS PLACE, the next is HUNDREDS PLACE, and the leftmost in a 4 digit number is the THOUSANDS PLACE. Numbers do not end but we will only use 4 digit number problems. The same idea can be used to get the sum of bigger numbers.",
                        "Numbers with more than one digit are multiplied column by column from right to left, the right most bottom digit is multiplied by each number from right to left carrying digits over just like addition, then do the same with the next digit to the left putting one more zero than the previous row starting from the leftmost position", 
                        "When all bottomm digits have been multiplied the numbers on each row are added together to get the final product   "
                    ],
                    questions: ["20 x 15 = ", "3 x 27 = ", "9 x 16 = ", "420 x 18 = ", "270 x 612 = ", "327 x 289 = ", "1041 x 1022 = ", "71 x 10 = ", "296 x 8127 = ", "96 x 0 = "],
                    answers: [300, 81, 144, 7560, 165240, 94503, 1063902, 710, 2405592, 9123, 0],
                },
        
                level3: {
                    info: ["Multiplication Properties & an Alternative Method"],
                    questions: ["3 x (8 x 3) = ", "56 x (4 x 2) = ", "40 x 5 x 2 = ", "0 x 16 = ", "1 x 50 = ", "4 x 510 = ", "2031 x 78 x  1 = ", "4 x 15 = ", "300 x 0 = ", 
                        "25 x 50 = "
                    ],
                    answers: [72, 448, 400, 0, 50, 2040, 158418, 60, 0, 1250],
                },
        
                level4: {
                    info: ["Test Time", "This is the test portion where you will be asked questions from all 3 lessons", "Good luck."],
                    questions: ["13 x 76 = ", "0 x 18 = ", "4 x 14 = ", "(5 x 60) x 2 = ", "22 x 10 = ", "16 x 5 = ", "3 x 1 = ", "15 x 21 = ", "2 x 0 = ", "(5 x 32) x 3 = "],
                    answers: [988, 0, 42, 600, 220, 80, 3, 315, 480],
                },

        },

        "Division" : {
            level1: {
                info: ["Single Digit Division",
                    "Division is an important idea to understand. You will always need to know what number you divide one number by another.",
                    "Key terms for this lesson are DIVIDE, DIVISION, QUOTIENT",
                    "When you have your favorite item let's say it is candy, you can count how many you have, the number you have is the amount",
                    "If you have to share the candy with your 3 friends you will divide the",
                    "To know what this new number is you add how many they gave you to how much you had, the act of adding is called addition",
                    "Adding is just counting the total number of items and the total is called the sum"
                ],
                questions: ["9 / 3 = ", " 5 / 5 = ", "6 / 2 = ", "4 / 2 = ", "8 / 4 = ", "7 / 1 = ", "4 / 1 = ", "2 / 1 = ", "2 / 2 = ", "0 / 5 = "],
                answers: [3, 1, 3, 2, 2, 7, 4, 2, 1, 0],
                },
        
                level2: {
                    info: ["Multi Digit Division & Long Division",
                        "See, division is easy. If you can divide single digit numbers then you can divide multi digit numbers. There is just a simple extra concept you need to understand. As you might know we count numbers using base 10. This means each digit in a number could be one of any of the ten digits 0-9. Key terms for this lesson are ONES PLACE, TENS PLACE, HUNDREDS PLACE, THOUSANDS PLACE, AND CARRY DIGIT",
                        "When numbers have more than one digit, the digits that are further left have a higher value and digits that are further right have a lower value. ",
                        "The rightmost digit has the lowest value, and is called the ones place. From right to left the next digit is the TENS PLACE, the next is HUNDREDS PLACE, and the leftmost in a 4 digit number is the THOUSANDS PLACE. Numbers do not end but we will only use 4 digit number problems. The same idea can be used to get the sum of bigger numbers.",
                        "Numbers with more than one digit are divided using long division  "
                    ],
                    questions: ["64 / 16 = ", "400 / 50 = ", "18 / 6 = ", "42 / 14 = ", "56 / 8 = ", "22 / 2 = ", "100 / 4 = ", "0 / 33 = ", "80 / 1 = ", "96 / 24 = "],
                    answers: [4, 8, 3, 3, 7, 11, 25, 0, 80, 4],
                },
        
                level3: {
                    info: ["More Division"],
                    questions: ["210 / 7 = ", "0 / 5 = ", "60 / 12 = ", "1000 / 5 = ", "15 / 15 = ", "765 / 45 = ", "2048 / 256 = ", "500 / 10 = ", "300 / 1= ", 
                        "50 / 25 = "
                    ],
                    answers: [30, 0, 5, 200, 1, 17, 8, 50, 300, 2],
                },
        
                level4: {
                    info: ["Test Time", "This is the test portion where you will be asked questions from all 3 lessons", "Good luck."],
                    questions: ["40 / 10 = ", "550 + 10 = ", "60 / 6 = ", "81 / 9  = ", "75 / 5 = ", "30 / 5 = ", "30 / 1 = ", "150 / 6 = ", "0 / 2 = ", "720 / 6 = "],
                    answers: [1139, 631, 12, 207, 53, 21, 4, 31, 2, 3559],
                },

        },

        "Fractions" : {
            level1: {
                info: ["Reducing Fractions",
                    "Reducing fractions is an important idea to understand for working with fractions. You will always need to know what number you get when two or more numbers are put together.",
                    "Key terms for this lesson are REDUCE, DIVIDE, PARTS, WHOLE",
                    "Fractions represent parts of a whole but not all fractions are in the simplest form",
                    "Fractions can be reduced to their simplest form to help you better understand what they represent by using division"

                ],
                questions: ["4 / 4 = ", " 11 / 55 = ", "2 / 20 = ", "4 / 24 = ", "8 / 64 = ", "0 / 1 = ", "4 / 100 = ", "12 / 72 = ", "2 / 20 = ", "3 / 6 = "],
                answers: ["1", "1/5" , "1/10", "1/6", "1/8", "0", "1/25", "1/6", "1/10", "1/2"],
                },
        
                level2: {
                    info: ["Adding and Subtracting Fractions & Improper Fractions and Mixed Numbers",
                        "See,  is easy. If you can add single digit numbers then you can add multi digit numbers. There is just a simple extra concept you need to understand. As you might know we count numbers using base 10. This means each digit in a number could be one of any of the ten digits 0-9. Key terms for this lesson are ONES PLACE, TENS PLACE, HUNDREDS PLACE, THOUSANDS PLACE, AND CARRY DIGIT",
                        "When numbers have more than one digit, the digits that are further left have a higher value and digits that are further right have a lower value. ",
                        "The rightmost digit has the lowest value, and is called the ones place. From right to left the next digit is the TENS PLACE, the next is HUNDREDS PLACE, and the leftmost in a 4 digit number is the THOUSANDS PLACE. Numbers do not end but we will only use 4 digit number problems. The same idea can be used to get the sum of bigger numbers.",
                        "Numbers with more than one digit are added column by column from right to left and when a sum of a column is bigger than 9, the ONES PLACE digit is the sum for that column and the TENS PLACE DIGIT is a carry digit to the next column to be added with that columns numbers. This represents that the sum of the numbers added is larger than 9 and the CARRY digit is placed in the next column to show that the next highest place value has increased by 1.   "
                    ],
                    questions: ["(2 / 10) + (1 / 5) = ", "(4 / 3) + (2 / 7) = ", "(9 / 9) + (2 / 6) = ", "(1 / 6) + (1 / 8) = ", "(2 / 7) + (1 / 2) = ", "(3 / 7) + (2 / 9) = ", "1 + (5 / 2) = ", "7 + (1 / 3) = ", "(9 / 10) + (8 / 20) = ", "(4 / 6) + 0 = "],
                    answers: ["2/5", "34/21", "4/3", "7/24", "11/14", "34/63", "7/2", "22/3", "13/10", "2/3"],
                },
        
                level3: {
                    info: ["Multiplying and Dividing Fractions"],
                    questions: ["(3 / 2) x (4 / 3) = ", "(5 / 6) / (4 / 2) = ", "(4 / 1) x (2 / 7) = ", "0 x (16 / 2) = ", "(2 / 10) / (4 / 5) = ", "(4 / 7) x (5 / 22) = ", "(20 / 31) x (7 / 8) x (1 / 10) = ", "(8 / 14) x (1 / 15) x (6 / 7) = ", "(3 / 12) x 1= ", 
                        "(4 / 5) / (6 / 10) = "
                    ],
                    answers: ["2", "5/12", "8/7", "0", "1/4", "10/77", "7/124", "24/735", "1/4", "4/3"],
                },
        
                level4: {
                    info: ["Test Time", "This is the test portion where you will be asked questions from all 3 lessons", "Good luck."],
                    questions: ["(23 / 2) x (4 / 13) = ", "(5 / 16) / (4 / 2) = ", "(4 / 10) / (2 / 70) = ", "0 x (16 / 2) = ", "(2 / 100) / (4 / 15) = ", "(4 / 7) / (5 / 22) = ", "(20 / 31) x (7 / 8) x (1 / 10) = ", "(8 / 14) x (1 / 15) x (6 / 7) = ", "(3 / 12) x 1= ", 
                        "(4 / 5) / (6 / 10) = "],
                    answers: [1139, 631, 12, 207, 53, 21, 4, 31, 2, 3559],
                },
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