import React, { useState }  from 'react'

const Username_live = () => {
    const [username, setUsername] = useState("");
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Live Username Display</h2>

      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{
          padding: "8px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc"
        }}
      />

      <h3 style={{ marginTop: "20px" }}>
        {username ? `You typed: ${username}` : "Start typing..."}
      </h3>
    </div>
    </div>
  )
}

export default Username_live
