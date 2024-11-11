import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineUser } from "react-icons/hi";


export const Navbar = () => {
  const user = true;
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className='max-w-full mx-auto py-2 bg-bgdark'>
    <header className='max-w-screen-xl mx-auto px-4 py-6'>
      <nav className='flex justify-between items-center'>
        
        {/* Logo on the left */}
        <div className="flex-1 text-secondary">
          <Link to="/" className='flex-shrink-0'>Logo</Link>
        </div>

        {/* Middle menu items, centered on larger screens */}
        <div className='hidden lg:flex flex-1 justify-center text-secondary font-secondary font-extralight'>
          <ul className='flex items-center gap-8'>
            <li className='nav-item'><Link to="/">Home</Link></li>
            <li className='nav-item'><Link to="/allinventory">All Inventory</Link></li>
            <li className='nav-item'><Link to="/about">About</Link></li>
            <li className='nav-item bg-primary px-3 py-2 rounded-3xl'><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Right div with contact info, visible on larger screens */}
        <div className='hidden lg:flex flex-1 justify-end items-center text-secondary font-secondary font-extralight'>
            <div className='lg:flex flex justify-between gap-5'>
                <div className='m-auto'><Link to="/admin">Admin</Link></div>
            <div className='m-auto text-2xl text-accent'>
                {/* <Link to="/profile"><HiOutlineUser/></Link> */}
            </div>
          <ul className='m-auto'>
            <li className='py-1'>Cell Phone: 828-238-4020</li>
            <li className='py-1'>Address: Gamewell, NC</li>
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
            <button 
              className='text-xl' 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? '✖' : '☰'} {/* Conditional icon rendering */}
            </button>
          </div>

        {/* Toggleable menu items and right div for small screens */}
        {menuOpen && (

          <div className='lg:hidden z-50 absolute top-20 left-0 right-0 bg-bgdark mt-2 py-4 shadow-md text-secondary font-secondary font-extralight'>
            {/* Centered toggleable menu items */}
            <ul className='flex flex-col items-center gap-4'>
              <li className='nav-item'><Link to="/">Home</Link></li>
              <li className='nav-item'><Link to="/allinventory">All Inventory</Link></li>
              <li className='nav-item'><Link to="/about">About</Link></li>
              <li className='nav-item'><Link to="/contact">Contact</Link></li>
            </ul>

            {/* Right div with contact info, centered below menu items */}
            <div className='mt-4'>
              <ul className='flex flex-col items-center gap-4 text-secondary font-secondary font-extralight'>
                <li>cell phone</li>
                <li>address</li>
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