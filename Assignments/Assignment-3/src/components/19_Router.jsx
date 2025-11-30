// App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";

/* --- Simple page components --- */
function Home() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Home</h1>
      <p>Welcome to the Home page.</p>
    </div>
  );
}

function About() {
  return (
    <div style={{ padding: 20 }}>
      <h1>About</h1>
      <p>This is a simple demo app using react-router-dom.</p>
    </div>
  );
}

function Products() {
  const products = [
    { id: 1, name: "Laptop", price: 55000 },
    { id: 2, name: "Keyboard", price: 1200 },
    { id: 3, name: "Mouse", price: 700 },
  ];

  return (
    <div style={{ padding: 20 }}>
      <h1>Products</h1>
      <ul>
        {products.map((p) => (
          <li key={p.id}>
            {p.name} — ₹{p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* --- App with Router and Nav --- */
export default function App() {
  const activeStyle = {
    fontWeight: "700",
    textDecoration: "underline",
  };

  const navStyle = {
    display: "flex",
    gap: "12px",
    padding: "12px 20px",
    borderBottom: "1px solid #e5e7eb",
    marginBottom: 12,
  };

  return (
    <Router>
      <nav style={navStyle}>
        <NavLink
          to="/"
          end
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>

        <NavLink
          to="/about"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          About
        </NavLink>

        <NavLink
          to="/products"
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Products
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/products" element={<Products />} />

        {/* optional: fallback route */}
        <Route
          path="*"
          element={
            <div style={{ padding: 20 }}>
              <h2>404 — Not Found</h2>
              <p>Page not found. Go back to <NavLink to="/">Home</NavLink>.</p>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

