import React from 'react'
import Child from './7_Child.jsx'

const Parent = () => {
    const showAlert = () => {
    alert("Button clicked from Child Component!");
  };
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Parent Component</h2>

      {/* Passing function as a prop */}
      <Child triggerAlert={showAlert} />
    </div>
    </div>
  )
}

export default Parent
