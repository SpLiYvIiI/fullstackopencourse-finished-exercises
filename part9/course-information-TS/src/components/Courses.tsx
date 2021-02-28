import React from 'react'
import {CoursePart} from '../types'
import Part from './Part'

const Courses : React.FC<{courses : CoursePart[]}> = ({courses}) =>{
    return(
        <div>
            {
                courses.map((course : CoursePart, i : number) =>{
                return(
                  <Part course={course} index={i} key={i}/>
                )
                })
            }
        </div>
    )
} 

export default Courses