import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase.config';

function DashboardLayout() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      console.log('User logged out successfully');
      navigate('/admin'); // Redirect to the login page
    } catch (error) {
      console.error('Error logging out:', error.message);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex flex-col h-screen">
      {/* Top Navigation Bar */}
      <div className="bg-gray-800 text-white flex items-center justify-between p-4 lg:hidden">
        <span className="font-bold text-lg">Admin Dashboard</span>
        <button
          onClick={toggleDropdown}
          className="text-white focus:outline-none"
        >
          {isDropdownOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Horizontal Dropdown Menu for Small Screens */}
      {isDropdownOpen && (
        <div className="bg-gray-800 text-white lg:hidden">
          <ul className="flex flex-row justify-around">
            <li className="p-2 hover:bg-gray-700">
              <Link to="/dashboard" onClick={toggleDropdown}>
                Dashboard
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/dashboard/manage-cars" onClick={toggleDropdown}>
                Manage Cars
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/dashboard/add-new-car" onClick={toggleDropdown}>
                Add New Car
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <Link to="/" onClick={toggleDropdown}>
                Return to Site
              </Link>
            </li>
            <li className="p-2 hover:bg-gray-700">
              <button onClick={handleLogout} className="w-full text-left">
                Logout
              </button>
            </li>
          </ul>
        </div>
      )}

      {/* Sidebar for Larger Screens */}
      <div className="hidden lg:flex w-64 bg-gray-800 text-white flex-col">
        <div className="p-4">
          <span className="font-bold text-lg">Admin Dashboard</span>
        </div>
        <nav className="flex-1">
          <ul>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/manage-cars">Manage Cars</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/dashboard/add-new-car">Add New Car</Link>
            </li>
            <li className="p-4 hover:bg-gray-700">
              <Link to="/">Return to Site</Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={handleLogout}
          className="p-4 hover:bg-gray-700 text-left mt-auto"
        >
          Logout
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-auto p-4">
        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;