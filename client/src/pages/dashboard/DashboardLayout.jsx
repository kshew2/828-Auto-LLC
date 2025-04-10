import React, { useState } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi';

function DashboardLayout() {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-gray-800 text-white flex flex-col transition-all duration-300 lg:w-64`}
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
          className={`p-4 hover:bg-gray-700 text-left ${!isSidebarOpen && 'hidden lg:block'}`}
        >
          ( Log out after using )
          <br />
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