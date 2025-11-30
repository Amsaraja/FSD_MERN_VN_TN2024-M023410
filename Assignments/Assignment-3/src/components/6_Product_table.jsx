import React from 'react'

const Product_table = () => {
     const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Keyboard", price: 1200 },
    { id: 3, name: "Mouse", price: 700 },
    { id: 4, name: "Monitor", price: 8000 }
  ];
  return (
    <div>
       <div style={{ padding: "20px" }}>
      <h2>Product List</h2>

      <table
        style={{
          width: "400px",
          borderCollapse: "collapse",
          marginTop: "10px"
        }}
      >
        <thead>
          <tr>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>ID</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Name</th>
            <th style={{ border: "1px solid #ccc", padding: "8px" }}>Price</th>
          </tr>
        </thead>

        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {product.id}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                {product.name}
              </td>
              <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                ₹{product.price}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default Product_table
