import React from 'react'

export default ({ message,type }) => {
  if(message===null) return <></>
  else if (type === 'succ'){
    return (
      <div className="success">
        {message}
      </div>
    )
  }
  else {
    return (
      <div className="error">
        {message}
      </div>
    )
  }
}
