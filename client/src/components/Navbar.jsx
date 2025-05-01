import React, { useState, useEffect, useRef } from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { HiOutlineUser, HiPhone, HiLocationMarker } from "react-icons/hi";
import { FaCaretSquareDown } from "react-icons/fa";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase/firebase.config";

const navigation = [
  { name: "Dashboard", href: "/dashboard" },
  { name: "Manage Cars", href: "/dashboard/manage-cars" },
  { name: "Add Car", href: "/dashboard/add-car" },
];

export const Navbar = () => {
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef(null);

  // Track Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup the listener on unmount
  }, []);

  // useEffect(() => {
  //   const handleScroll = () => {
  //     setMenuOpen(false);
  //     setIsDropDownOpen(false);
  //   };

  //   const handleClickOutside = (event) => {
  //     if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
  //       setIsDropDownOpen(false);
  //       setMenuOpen(false);
  //     }
  //   };

  //   document.addEventListener("mousedown", handleClickOutside);
  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    // Close the menu when navigating to another page
    setMenuOpen(false);
    setIsDropDownOpen(false);
  }, [location]);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out from Firebase
      setIsLoggedIn(false);
      navigate("/"); // Redirect to the home page
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  };

  const handleNavLinkClick = () => {
    setMenuOpen(false);
    setIsDropDownOpen(false);
  };

  return (
    <div className="max-w-full mx-auto py-2 bg-bgdark">
      <header className="max-w-screen-xl mx-auto px-4 py-6">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex-1 text-secondary">
            <NavLink to="/" className="flex-shrink-0 sm:h-10 h-1">
              <img
                src="../../public/bannercar.jpg"
                alt="Logo"
                className="h-12 w-28 lg:h-20 lg:w-40"
              />
            </NavLink>
          </div>

          {/* Middle menu items */}
          <div className="hidden lg:flex flex-1 justify-center text-secondary font-secondary font-extralight">
            <ul className="flex items-center gap-8">
              <li className="whitespace-nowrap">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                  onClick={handleNavLinkClick}
                >
                  Home
                </NavLink>
              </li>
              <li className="whitespace-nowrap">
                <NavLink
                  to="/allinventory"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                  onClick={handleNavLinkClick}
                >
                  All Inventory
                </NavLink>
              </li>
              <li className="whitespace-nowrap">
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                  onClick={handleNavLinkClick}
                >
                  About
                </NavLink>
              </li>
              <li className="whitespace-nowrap">
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? "text-secondary-accent"
                      : "text-secondary hover:text-secondary-accent"
                  }
                  onClick={handleNavLinkClick}
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right div */}
          <div className="hidden lg:flex flex-1 justify-end items-center text-secondary font-secondary font-extralight">
            <div className="lg:flex flex justify-between gap-5 text-center items-center">
              {/* <div className="relative m-auto">
                {isLoggedIn ? (
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

                    {isDropDownOpen && (
                      <div
                        ref={dropdownRef}
                        className="absolute z-50 left-1/2 transform -translate-x-1/2 mt-2 bg-secondary text-white shadow-lg rounded"
                        style={{ minWidth: "150px" }}
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
                                onClick={handleNavLinkClick}
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={handleLogout}
                              className="w-full text-center text-bgdark hover:text-secondary-accent"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </NavLink>
                )}
              </div> */}
              <ul className="">
                <li className="py-1">Cell Phone: 828-238-4020</li>
                <li className="py-1">Address: Gamewell, NC</li>
              </ul>
            </div>
          </div>

          {/* Mobile menu toggle */}
          <div className="lg:hidden flex-1 flex justify-end text-secondary font-secondary">
            <button className="text-xl" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? "✖" : "☰"}
            </button>
          </div>

          {/* Mobile menu */}
          {menuOpen && (
            <div className="lg:hidden z-50 absolute top-20 left-0 right-0 bg-bgdark mt-2 py-4 shadow-md text-secondary font-secondary font-extralight">
              <ul className="flex flex-col items-center gap-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                    onClick={handleNavLinkClick}
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
                    onClick={handleNavLinkClick}
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
                    onClick={handleNavLinkClick}
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
                    onClick={handleNavLinkClick}
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
              {/* Static content (login button, address, phone) */}
              <div className="mt-4 text-center">
              {/* {isLoggedIn ? (
                  <div className="relative flex items-center justify-center mt-4">

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

                    {isDropDownOpen && (
                      <div
                      ref={dropdownRef}
                      className="absolute z-50 top-full left-1/2 transform -translate-x-1/2 pt-2 bg-secondary text-white shadow-lg rounded"
                      style={{ minWidth: "150px" }}
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
                                onClick={handleNavLinkClick}
                              >
                                {item.name}
                              </NavLink>
                            </li>
                          ))}
                          <li>
                            <button
                              onClick={handleLogout}
                              className="w-full text-center text-bgdark hover:text-secondary-accent"
                            >
                              Logout
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </div>
                ) : (
                  <NavLink
                    to="/admin"
                    className={({ isActive }) =>
                      isActive
                        ? "text-secondary-accent"
                        : "text-secondary hover:text-secondary-accent"
                    }
                    onClick={handleNavLinkClick}
                  >
                    Login
                  </NavLink>
                )} */}
                <ul className="flex flex-col mt-4 items-center gap-4 text-secondary font-secondary font-extralight">
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