import React, { useState, useContext, useEffect } from "react";
import { AuthContext } from '../context/AuthContext'; 
import './Register.scss'; // Import the styling

const Register = () => {
  const { register } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // Use effect to hide Sidebar and MobileHeader on register page
  useEffect(() => {
    if (window.location.pathname === '/register') {
      localStorage.removeItem("auth_token");
      // setToken(null);
      // setUser(null);
    }
    // Hide the sidebar and header by adding/removing classes or directly managing state
    const sidebar = document.querySelector('.site-nav');
    const mobileHeader = document.querySelector('.mobile-header');
    
    if (sidebar) sidebar.style.display = 'none'; // Hide sidebar
    if (mobileHeader) mobileHeader.style.display = 'none'; // Hide mobile header

    return () => {
      // Clean up on component unmount, show the sidebar and header again
      if (sidebar) sidebar.style.display = ''; // Show sidebar again
      if (mobileHeader) mobileHeader.style.display = ''; // Show mobile header again
    };
  }, []); // This effect runs only once on mount

  const handleSubmit = (e) => {
    e.preventDefault();
    register(name, email, password, passwordConfirmation); // Call register function from AuthContext
  };

  return (
    <div className="register-page">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
