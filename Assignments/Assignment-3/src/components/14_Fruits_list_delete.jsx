import React, {useState} from 'react'

const Fruits_list_delete = () => {
    const [fruits, setFruits] = useState(["Apple", "Banana", "Orange"]);
  const [newFruit, setNewFruit] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newFruit.trim() === "") return;

    setFruits([...fruits, newFruit]); 
    setNewFruit("");
  };

  const handleDelete = (index) => {
    const updatedFruits = fruits.filter((_, i) => i !== index);
    setFruits(updatedFruits);
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Fruit List</h2>

      {/* Add Form */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter fruit name"
          value={newFruit}
          onChange={(e) => setNewFruit(e.target.value)}
          style={{ padding: "8px", marginRight: "10px" }}
        />

        <button type="submit" style={{ padding: "8px 12px" }}>
          Add Fruit
        </button>
      </form>

      {/* Fruit List */}
      <ul style={{ marginTop: "20px" }}>
        {fruits.map((fruit, index) => (
          <li key={index} style={{ marginBottom: "10px" }}>
            {fruit}

            <button
              onClick={() => handleDelete(index)}
              style={{
                marginLeft: "10px",
                padding: "4px 8px",
                background: "red",
                color: "white",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer",
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Fruits_list_delete
