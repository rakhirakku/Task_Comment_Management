import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // Wait until loading is complete
  if (loading) return <div>Loading...</div>;

  // Redirect to login if user is not authenticated
  if (!user) return <Navigate to="/login" />;

  // Render the protected route if user is authenticated
  return children;
};

export default ProtectedRoute;