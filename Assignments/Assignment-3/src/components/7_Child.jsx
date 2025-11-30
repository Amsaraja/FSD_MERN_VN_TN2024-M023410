import React from 'react'

const Child = (props) => {
  return (
    <div>
      <div>
      <h3>Child Component</h3>

      <button
        onClick={props.triggerAlert}
        style={{ padding: "8px 15px", marginTop: "10px" }}
      >
        Click Me
      </button>
    </div>
    </div>
  )
}

export default Child
