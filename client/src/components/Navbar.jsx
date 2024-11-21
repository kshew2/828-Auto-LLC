import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiPhone } from "react-icons/hi";
import { HiLocationMarker } from "react-icons/hi";

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
  const currentuser = true;
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
                    isActive ? "text-secondary-accent" : "text-secondary"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/allinventory"
                  className={({ isActive }) =>
                    isActive ? "text-secondary-accent" : "text-secondary"
                  }
                >
                  All Inventory
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive ? "text-secondary-accent" : "text-secondary"
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive ? "text-secondary-accent" : "text-secondary"
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Right div with contact info, visible on larger screens */}
          <div className="hidden lg:flex flex-1 justify-end items-center text-secondary font-secondary font-extralight">
            <div className="lg:flex flex justify-between gap-5">
              <div className="m-auto relative">
                {currentuser ? (
                  <>
                    <div className="m-auto relative">
                      <button
                        onClick={() => setIsDropDownOpen(!isDropDownOpen)}
                        className={({ isActive }) =>
                          isActive ? "text-secondary-accent" : "text-secondary"
                        }
                      >
                        Admin
                      </button>
                      {/* show dropdowns */}
                      {isDropDownOpen && (
                        <div>
                          <ul>
                            {navigation.map((item) => (
                              <li key={item.name}>
                              <NavLink
                                to={item.href}
                                className={({ isActive }) =>
                                  isActive ? "text-secondary-accent" : "text-secondary"
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
                  </>
                ) : (
                  <div className="m-auto">
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive ? "text-secondary-accent" : "text-secondary"
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
            <div className="lg:hidden z-50 absolute top-20 overflow-x-hidden left-0 right-0 bg-bgdark mt-2 mr-[17px] py-4 shadow-md text-secondary font-secondary font-extralight">
              {/* Centered toggleable menu items */}
              <ul className="flex flex-col items-center gap-4">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive ? "text-secondary-accent" : "text-secondary"
                    }
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/allinventory"
                    className={({ isActive }) =>
                      isActive ? "text-secondary-accent" : "text-secondary"
                    }
                  >
                    All Inventory
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/about"
                    className={({ isActive }) =>
                      isActive ? "text-secondary-accent" : "text-secondary"
                    }
                  >
                    About
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "text-secondary-accent" : "text-secondary"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>

              {/* Right div with contact info, centered below menu items */}
              <div className="mt-4">
                <ul className="flex flex-col items-center gap-4 text-secondary font-secondary font-extralight">
                  <li>
                    <div className="flex flex-row items-center justify-center gap-3">
                      <div className=" text-accent text-lg ">
                        <HiPhone />
                      </div>
                      <div className="text-secondary-accent text-lg hover:text-secondary">
                        <a href="tel:+18282384020">(828) 238-4020</a>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div className="flex flex-row items-center justify-center gap-2">
                      <div className=" text-accent text-lg ">
                        <HiLocationMarker />
                      </div>
                      <div className="text-secondary-accent text-lg hover:text-secondary">
                        <a href="https://www.google.com/maps/place/2788+Morganton+Blvd+SW,+Lenoir,+NC+28645/@35.8752307,-81.5944216,17z/data=!3m1!4b1!4m6!3m5!1s0x8850d94e1760b347:0xb9f8f5a45a1cc6df!8m2!3d35.8752307!4d-81.5918467!16s%2Fg%2F11j7lwyc8f?entry=ttu&g_ep=EgoyMDI0MTExOC4wIKXMDSoASAFQAw%3D%3D">
                          Gamewell, NC
                        </a>
                      </div>
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
