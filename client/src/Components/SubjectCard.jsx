import React from 'react'
import { Link } from 'react-router-dom'

const SubjectCard = ({name, link}) => {
  return (
    <Link to={link}>
    <div className=" ml-10 flex justify-center bg-gray-50 md:ml-25 cursor-pointer shadow-xl rounded-lg hover:md:w-70 hover:md:h-70 w-55 h-50 md:w-65 md:h-55 hover:w-60 hover:h-55"
    >
        <h1 className="m-auto font-bold text-2xl md:3xl">{name}</h1>
    </div>
    </Link>
  )
}

export default SubjectCard