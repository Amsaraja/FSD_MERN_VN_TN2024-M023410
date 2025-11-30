import React, { useEffect, useState }  from 'react'

const Product_fetch = () => {
    const [products, setProducts] = useState([]);

  // Fetch API call
  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.products);
      })
      .catch((err) => console.log("Error:", err));
  }, []);
  return (
    <div>
        <div style={{ padding: "20px" }}>
      <h2>Products List</h2>

      {products.length === 0 ? (
        <p>Loading...</p>
      ) : (
        products.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ccc",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
              width: "300px"
            }}
          >
            <h3>{item.title}</h3>
            <p><strong>Price:</strong> ${item.price}</p>
            <p><strong>Brand:</strong> {item.brand}</p>
          </div>
        ))
      )}
    </div>
    </div>
  )
}

export default Product_fetch
