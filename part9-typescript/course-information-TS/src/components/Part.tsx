import React from 'react'
import {CoursePart} from '../types'
import {assertNever} from '../helper'


const Part: React.FC<{course : CoursePart,index : number}> = ({course,index}) => {
    switch(course.name){
        case "Fundamentals":{
        return(
            <div>
                <h2>{index+1}) Name : {course.name}</h2>
                <p>Exercise count : {course.exerciseCount}</p>
                <p>Description : {course.description}</p>
            </div>
        )            
        }
        case "Using props to pass data":{
        return(
            <div>
                <h2>{index+1}) Name : {course.name}</h2>
                <p>Exercise count : {course.exerciseCount}</p>
                <p>Group project count : {course.groupProjectCount}</p>
            </div>
        )  
        }
        case "Deeper type usage":{
        return(
            <div>
                <h2>{index+1}) Name : {course.name}</h2>
                <p>Exercise count : {course.exerciseCount}</p>
                <p>Description : {course.description}</p>
                <p>Exercise submission link : <a href={course.exerciseSubmissionLink}>{course.exerciseSubmissionLink}</a></p>
            </div>
        )        
        }
        case "Very advanced type usage":{
            return(
            <div>
                <h2>{index+1}) Name : {course.name}</h2>
                <p>Exercise count : {course.exerciseCount}</p>
                <p>Something : {course.Something}</p>
            </div>
            )
        }
        default:
            return assertNever(course);
    }
}

export default Part

