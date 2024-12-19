import React, { useContext } from "react";
import './Sidebar.scss';
import logo from '../../logo-exemplifi.svg';
import { NavLink, useNavigate } from "react-router-dom";
import { FaThLarge, FaMinusSquare, FaSignOutAlt } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext"; // Import AuthContext

export const Sidebar = () => {
  const { logout } = useContext(AuthContext); // Get the logout function from AuthContext
  const navigate = useNavigate(); // useNavigate for redirecting after logout

  const toggleSidebar = () => {
    const siteNav = document.querySelector('.site-nav');
    if (siteNav) {
      siteNav.classList.toggle('open'); // Toggle the 'open' class
    }
  };

  // Handle the logout process
  const handleLogout = () => {
    logout(); // Call logout function to clear authentication data
    navigate('/login'); // Redirect user to login page
    toggleSidebar(); // Close the sidebar
  };

  return (
    <>
      <aside className="site-nav">
        <NavLink to="/" className="nav-brand">
          <img src={logo} alt="logo" /> Task Manager
        </NavLink>
        <ul className="sidebar-nav">
          <li className="nav-link">
            <NavLink to="/" className="" onClick={toggleSidebar}>
              <FaThLarge /> Overview
            </NavLink>
          </li>
          <li className="nav-link">
            <NavLink to="/all-tasks" className="" onClick={toggleSidebar}>
              <FaMinusSquare /> All Tasks
            </NavLink>
          </li>
          <li className="nav-link">
            {/* Use the handleLogout function on clicking Logout */}
            <NavLink to="#" className="" onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </NavLink>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;
