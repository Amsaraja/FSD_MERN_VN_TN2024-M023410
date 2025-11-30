import React from 'react'
import products from "./assets/Product_data.json";

const Product_data = () => {
  return (
    <div>
        <div style={{ padding: "20px" }}>
      <h2>Product Cards</h2>

      <div style={{ display: "flex", gap: "15px", flexWrap: "wrap" }}>
        {products.map((product) => (
          <div
            key={product.id}
            style={{
              width: "180px",
              border: "1px solid #ccc",
              borderRadius: "10px",
              padding: "15px",
              textAlign: "center"
            }}
          >
            <h3>{product.name}</h3>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
    </div>
    </div>
  )
}

export default Product_data
