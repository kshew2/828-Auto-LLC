import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";
import { FaCaretSquareDown } from "react-icons/fa";

const navigation = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "Orders",
    href: "/orders",
  },
  {
    name: "Cart Page",
    href: "/cart",
  },
  {
    name: "Check Out",
    href: "/checkout",
  },
];

export const Navbar = () => {
  const currentuser = false;
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  console.log(isDropDownOpen);

  return (
    <div className="max-w-full mx-auto py-2 bg-bgdark">
      <header className="max-w-screen-xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          {/* Logo on the left */}
          <div className="flex-1 text-secondary">
            <NavLink to="/" className="flex-shrink-0">
              Logo
            </NavLink>
          </div>

          {/* Middle menu items, centered on larger screens */}
          <div className="hidden lg:flex flex-1 justify-center text-secondary font-secondary font-extralight">
            <ul className="flex items-center gap-8">
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allinventory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                >
                  All Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right div with contact info, visible on larger screens */}
          <div className="hidden lg:flex flex-1 justify-end items-center text-secondary font-secondary font-extralight">
            <div className="lg:flex flex justify-between gap-5 mx-auto text-center items-center">
              <div className="relative m-auto">
                {currentuser ? (
                  <div className="relative">
                    <button
                      onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                      className={`flex items-center justify-center ${
                        isDropDownOpen
                          ? "text-secondary-accent"
                          : "text-secondary hover:text-secondary-accent"
                      }`}
                    >
                      <span>Admin</span>
                      <FaCaretSquareDown className="ml-1" />
                    </button>
                    {/* Dropdown */}
                    {isDropDownOpen && (
                      <div
                        className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-secondary text-white shadow-lg rounded"
                        style={{ minWidth: "150px" }} // Optional: Adjust dropdown width
                      >
                        <ul>
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                  isActive
                                    ? "text-secondary-accent"
                                    : "text-bgdark hover:text-secondary-accent"
                                }
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="m-auto">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? "text-secondary-accent"
                          : "text-secondary hover:text-secondary-accent"
                      }
                    >
                      Login
                    </NavLink>
                  </div>
                )}
              </div>

              {/* <div className="m-auto">
                <NavLink to="/admin" className={({ isActive }) => (isActive ? 'text-secondary-accent' : 'text-secondary')}>Admin</NavLink>
              </div> */}
              <div className="m-auto text-2xl text-accent">
                {/* <Link to="/profile"><HiOutlineUser/></Link> */}
              </div>
              <ul className="m-auto">
                <li className="py-1">Cell Phone: 828-238-4020</li>
                <li className="py-1">Address: Gamewell, NC</li>
              </ul>
            </div>
          </div>

          {/* Menu toggle button on the far right for small screens
        <div className="md:hidden flex-1 flex justify-end text-secondary font-secondary">
          <button 
            className='text-xl' 
            onClick={() => setMenuOpen(!menuOpen)}
          >
            &#9776; {/* Hamburger icon *
          </button>
        </div> */}
          {/* Menu toggle button on the far right for small screens */}
          <div className="lg:hidden flex-1 flex justify-end text-secondary font-secondary">
            <button className="text-xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✖" : "☰"} {/* Conditional icon rendering */}
            </button>
          </div>

          {/* Toggleable menu items and right div for small screens */}
          {menuOpen && (
            <div className="lg:hidden z-50 absolute top-20 left-0 right-0 bg-bgdark mt-2 py-4 shadow-md text-secondary font-secondary font-extralight">
              {/* Centered toggleable menu items */}
              <ul className="flex flex-col items-center gap-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allinventory"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                  >
                    All Inventory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="mx-auto text-center items-center">
                  <div className="relative">
                    {currentuser ? (
                      <>
                        <button
                          onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                          className={`flex items-center justify-center ${
                            isDropDownOpen
                              ? "text-secondary-accent"
                              : "text-secondary hover:text-secondary-accent"
                          }`}
                        >
                          <span>Admin</span>
                          <FaCaretSquareDown className="ml-1" />
                        </button>
                        {/* Dropdown */}
                        {isDropDownOpen && (
                          <div
                            className="absolute left-1/2 transform -translate-x-1/2 mt-2 bg-secondary text-white shadow-lg rounded"
                            style={{ minWidth: "150px" }} // Optional: Adjust dropdown width
                          >
                            <ul>
                              {navigation.map((item) => (
                                <li key={item.name}>
                                  <NavLink
                                    to={item.href}
                                    className={({ isActive }) =>
                                      isActive
                                        ? "text-secondary-accent"
                                        : "text-bgdark hover:text-secondary-accent"
                                    }
                                  >
                                    {item.name}
                                  </NavLink>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </>
                    ) : (
                      <NavLink
                        to="/login"
                        className={({ isActive }) =>
                          isActive
                            ? "text-secondary-accent"
                            : "text-secondary hover:text-secondary-accent"
                        }
                      >
                        Login
                      </NavLink>
                    )}
                  </div>
                </li>
              </ul>
              {/* Right div with contact info, centered below menu items */}
              <div className="mt-4">
                <ul className="flex flex-col items-center gap-4 text-secondary font-secondary font-extralight">
                  <li>
                    <div className="flex items-center gap-3">
                      <HiPhone className="text-accent text-lg" />
                      <a
                        href="tel:+18282384020"
                        className="text-secondary-accent text-lg hover:text-secondary"
                      >
                        (828) 238-4020
                      </a>
                    </div>
                  </li>
                  <li>
                    <div className="flex items-center gap-2">
                      <HiLocationMarker className="text-accent text-lg" />
                      <a
                        href="https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/"
                        className="text-secondary-accent text-lg hover:text-secondary"
                      >
                        Gamewell, NC
                      </a>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
