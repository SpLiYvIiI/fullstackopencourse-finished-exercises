import React from 'react'

export default () =>{
    const courses = [
        {
          name: 'Half Stack application development',
          id: 1,
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          id: 2,
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
      ]    
    return(
      <div>
          <h1>Web development curriculum</h1>
          <ul>
          {courses.map(course=>{
              return(
              <li key={course.id}>
              <h1>{course.name}</h1>
              <ul>
              {course.parts.map(part=>
              {
                return(<li key ={part.id}>
                {part.name} {part.exercises}
                </li>)
              }   
              )}
              <li style={{fontWeight: "bold"}}>Total of exercises {course.parts.reduce( ( sum, parts ) => sum + parts.exercises, 0)}</li>
              </ul>
              </li>)
          })}
          </ul>
      </div>
    )
}