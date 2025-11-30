import React, { useState } from 'react'

const Product_list = () => {

    const products = [
    { name: "Laptop", category: "Electronics" },
    { name: "Headphones", category: "Electronics" },
    { name: "T-Shirt", category: "Clothes" },
    { name: "Jeans", category: "Clothes" },
    { name: "Smartphone", category: "Electronics" }
  ];

  const [filterCategory, setFilterCategory] = useState("All");

  // Filter logic
  const filteredProducts =
    filterCategory === "All"
      ? products
      : products.filter((p) => p.category === filterCategory);


  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Product Filter</h2>

      {/* Filter Buttons */}
      <div style={{ marginBottom: "15px" }}>
        <button onClick={() => setFilterCategory("All")}>All</button>
        <button onClick={() => setFilterCategory("Electronics")} style={{ marginLeft: "10px" }}>
          Electronics
        </button>
        <button onClick={() => setFilterCategory("Clothes")} style={{ marginLeft: "10px" }}>
          Clothes
        </button>
      </div>

      {/* Display Products */}
      <ul>
        {filteredProducts.map((item, index) => (
          <li key={index}>
            {item.name} — <b>{item.category}</b>
          </li>
        ))}
      </ul>
    </div>
    </div>
  )
}

export default Product_list

