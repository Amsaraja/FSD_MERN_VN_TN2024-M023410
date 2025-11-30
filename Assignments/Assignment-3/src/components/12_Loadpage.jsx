import React, { useEffect, useState }  from 'react'

const Loadpage = () => {

     const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch("https://dummyjson.com/produc")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch");
        }
        return res.json();
      })
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((err) => {
        console.log("Error:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error loading data</h2>;
  }
  return (
    <div>
      <div style={{ padding: "20px" }}>
      <h2>Products List</h2>

      {products.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
            borderRadius: "8px",
            width: "300px",
          }}
        >
          <h3>{item.title}</h3>
          <p>
            <strong>Price:</strong> ${item.price}
          </p>
          <p>
            <strong>Brand:</strong> {item.brand}
          </p>
        </div>
      ))}
    </div>
    </div>
  )
}

export default Loadpage
