import React, { lazy, Suspense, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, BrowserRouter, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import "./App.scss";
import Sidebar from "./Layout/Sidebar/Sidebar";
import MobileHeader from "./Layout/MobileHeader/MobileHeader";
// import dotenv from "dotenv";
import ProtectedRoute from './ProtectedRoute';

// dotenv.config();

function App() {
  const navigate = useNavigate();
  const { user, loading } = useContext(AuthContext); // Fetch user and loading state from context
  const Home = lazy(() => import("./Pages/Home/Home"));
  const CreateTask = lazy(() => import("./Pages/CreateTask/CreateTask"));
  const TaskDetails = lazy(() =>import("./Pages/TaskDetails/TaskDetails"));
  const Login = lazy(() => import('./Pages/Login'));
  const Register = lazy(() => import('./Pages/Register'));

  // Effect for handling redirection logic
  useEffect(() => {
    if (loading) return; // Wait for the loading state to complete
    if (!user && window.location.pathname !== '/login' && window.location.pathname !== '/register') {
      navigate('/login'); // Redirect to login if the user is not authenticated
    } else if (user && window.location.pathname === '/login') {
      navigate('/'); // Redirect to home page if the user is authenticated but on login page
      window.location.reload(); // Refresh the page after navigation
    }
  }, [user, loading, navigate]);

  return (
      <Suspense>
        {/* Sidebar and Mobile Header are rendered only if user is authenticated */}
        {user && <Sidebar />}
        {user && <MobileHeader />}
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTask />
              </ProtectedRoute>
            }
          />
          <Route
            path="/card-details/:id"
            element={
              <ProtectedRoute>
                <TaskDetails />
              </ProtectedRoute>
            }
          />

          {/* Catch-all route */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Suspense>
  );
}

export default App;
