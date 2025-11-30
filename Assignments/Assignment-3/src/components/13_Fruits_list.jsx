import React, {useState} from 'react'

const Fruits_list = () => {
    const [fruits, setFruits] = useState(["Apple", "Banana", "Orange"]);
  const [newFruit, setNewFruit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newFruit.trim() === "") return;

    setFruits([...fruits, newFruit]); // add new fruit
    setNewFruit(""); 
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Fruit List</h2>

      {/* Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter fruit name"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit" style={{ padding: "8px 12px", border:"solid 1px" }}>
          Add Fruit
        </button>
      </form>

      {/* Fruit Display */}
      <ul style={{ marginTop: "20px" }}>
        {fruits.map((fruit, index) => (
          <li key={index}>{fruit}</li>
        ))}
      </ul>
    </div>
    </div>
  )
}


export default Fruits_list
