// src/components/Navbar.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isSidebarOpen, setIsSidebarOpen }) => {

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
      };
      
    return (
        <>
            <nav className='border'>
                <button className="lg:hidden" onClick={toggleSidebar}>
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                    </svg>
                </button>
                <div>
                    <input id="" class="w-full h-full" type="text" name="input-name" title="Inpit title" placeholder="Business Name" />
                </div>
            </nav>
        </>
    );
}

export default Navbar;
