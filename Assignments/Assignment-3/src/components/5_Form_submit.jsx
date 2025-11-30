import React, {useState} from 'react'

const Form_submit = () => {
     const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault(); // stop page refresh
    setSubmittedData({ name, email });
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Simple Form</h2>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ padding: "6px", marginLeft: "10px" }}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <label>Email: </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ padding: "6px", marginLeft: "10px" }}
          />
        </div>

        <button type="submit" style={{ padding: "8px 15px" }}>
          Submit
        </button>
      </form>

      {/* Display submitted data */}
      {submittedData && (
        <div style={{ marginTop: "20px" }}>
          <h3>Submitted Data:</h3>
          <p><strong>Name:</strong> {submittedData.name}</p>
          <p style={{marginleft:"10px"}}><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
    </div>
    </div>
  )
}

export default Form_submit
