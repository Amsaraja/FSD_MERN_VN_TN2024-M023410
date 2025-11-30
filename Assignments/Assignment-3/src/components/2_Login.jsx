import React, { useState } from 'react'

const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  
  const handleLogin = () => {
    new Promise((resolve, reject) => {
      const success = true;

      if (success) resolve("User Logged In");
      else reject("Login Failed");
    })
      .then(() => setIsLoggedIn(!isLoggedIn))   
      .catch(() => setIsLoggedIn(false));
  }

  return (
    <div>
      <div style={{ padding: "20px" }}>
        <h2>
          {isLoggedIn ? "Welcome back!" : "Please log in"}
        </h2>

        <button onClick={handleLogin}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </div>
  )
}

export default Login
