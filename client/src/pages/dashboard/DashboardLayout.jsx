import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config'; // Import Firebase Auth

function DashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar is closed by default
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Dropdown for mobile

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log the user out from Firebase
      console.log('User logged out successfully');
      navigate('/admin'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Top Navigation Bar for Small Screens */}
      <div className="bg-gray-800 text-white flex items-center justify-between p-4 lg:hidden">
        <span className="font-bold text-lg">Admin Dashboard</span>
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none"
        >
          {isDropdownOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Dropdown Menu for Small Screens */}
      {isDropdownOpen && (
        <div className="bg-gray-800 text-white lg:hidden">
          <ul className="flex flex-col">
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard" onClick={toggleDropdown}>
                Dashboard
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/manage-cars" onClick={toggleDropdown}>
                Manage Cars
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/add-new-car" onClick={toggleDropdown}>
                Add New Car
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/" onClick={toggleDropdown}>
                Return to Site
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Sidebar for Larger Screens */}
      <div
        className={`hidden lg:flex ${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-gray-800 text-white flex-col transition-all duration-300`}
      >
        <div className="p-4 flex items-center justify-between">
          <span className={`font-bold text-lg ${!isSidebarOpen && 'hidden lg:block'}`}>
            Admin Dashboard
          </span>
          <button
            onClick={toggleSidebar}
            className="text-white focus:outline-none lg:hidden"
          >
            {isSidebarOpen ? <HiX size={20} /> : <HiMenu size={20} />}
          </button>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard" className={`${!isSidebarOpen && 'hidden lg:block'}`}>
                Dashboard
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/manage-cars" className={`${!isSidebarOpen && 'hidden lg:block'}`}>
                Manage Cars
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/add-new-car" className={`${!isSidebarOpen && 'hidden lg:block'}`}>
                Add New Car
              </Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/" className={`${!isSidebarOpen && 'hidden lg:block'}`}>
                Return to Site
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className={`p-4 hover:bg-gray-700 text-left mt-auto ${!isSidebarOpen && 'hidden lg:block'}`}
        >
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;