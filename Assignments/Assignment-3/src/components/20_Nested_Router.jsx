// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  Outlet,
} from "react-router-dom";

/* --- Page Components --- */
function Home() {
  return <h2 style={{ padding: 20 }}>Home Page</h2>;
}

function About() {
  return <h2 style={{ padding: 20 }}>About Page</h2>;
}

/* --- Nested Product Pages --- */
function Products() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>

      <nav style={{ display: "flex", gap: "12px", marginBottom: "20px" }}>
        <NavLink to="electronics">Electronics</NavLink>
        <NavLink to="fashion">Fashion</NavLink>
      </nav>

      {/* Nested content appears here */}
      <Outlet />
    </div>
  );
}

function Electronics() {
  return <h3>Electronics Products: Mobiles, Laptops, TVs...</h3>;
}

function Fashion() {
  return <h3>Fashion Products: Clothes, Shoes, Accessories...</h3>;
}

/* --- Main App Router --- */
export default function App() {
  return (
    <Router>
      <nav
        style={{
          display: "flex",
          gap: "15px",
          padding: "12px 20px",
          borderBottom: "1px solid #ccc",
        }}
      >
        <NavLink to="/">Home</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/products">Products</NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />

        {/* Parent route */}
        <Route path="/products" element={<Products />}>
          {/* Nested routes */}
          <Route path="electronics" element={<Electronics />} />
          <Route path="fashion" element={<Fashion />} />
        </Route>

        {/* Optional 404 route */}
        <Route path="*" element={<h2>404 - Not Found</h2>} />
      </Routes>
    </Router>
  );
}

