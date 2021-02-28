import React from 'react'
import {CoursePart} from '../types'


const Total : React.FC<{courses : CoursePart[]}> = ({courses}) => {
    return(
        <h1>
        Number of exercises{" "}
        {courses.reduce((carry : number, course : CoursePart) => carry + course.exerciseCount, 0)}
        </h1>
    )
}

export default Total