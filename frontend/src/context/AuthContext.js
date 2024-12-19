import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

// Create a context to provide authentication state
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("auth_token"));

  // Check token on load and fetch user data
//   useEffect(() => {
//     if (token) {
//       axios.defaults.headers["Authorization"] = `Bearer ${token}`;
//       fetchUser();
//     } else {
//       setLoading(false); // No token, finish loading
//     }
//   }, [token]);

  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUser(); // Fetch the user data if a token exists
    } else {
      setLoading(false); // No token, stop loading
    }
  }, []);
    // Fetch user data from API
    const fetchUser = async () => {
        try {
        const token = localStorage.getItem('auth_token');
        console.log("tt",token);
        if (!token) {
            throw new Error("No authentication token found");
        }

        const response = await axios.get('http://127.0.0.1:8002/api/user', {
            headers: {
            'Authorization': `Bearer ${token}`, // Use token from localStorage
            },
        });

        console.log("User data fetched:", response.data);
        setUser(response.data); // Set user data from the response
        setLoading(false); // Data fetched, stop loading
        } catch (error) {
        console.error("Failed to fetch user", error);
        setLoading(false); // If there's an error, stop loading
        }
    };

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post("http://127.0.0.1:8002/api/login", { email, password });
      const { token } = response.data;
      localStorage.setItem("auth_token", token); // Store token
      setToken(token); // Update token in state
      console.log("aaaaa",response.data)
      fetchUser(); // Fetch user after successful login
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  // Register function
  const register = async (name, email, password, password_confirmation) => {
    try {
      await axios.post("http://127.0.0.1:8002/api/register", {
        name,
        email,
        password,
        password_confirmation,
      });
      alert("Registration successful");
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("auth_token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

