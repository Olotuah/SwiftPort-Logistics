// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react'; // for accessibility
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';

export default function Navbar() {
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const links = [
    { to: '/', label: 'Home' },
    { to: '/about', label: 'About' },
    { to: '/projects', label: 'Projects' },
    { to: '/track', label: 'Track' },
    { to: '/contact', label: 'Contact' }
  ];

  return (
    <nav className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between h-16">
        <NavLink to="/" className="text-xl font-bold text-yellow-400">
          SwiftPort Logistics
        </NavLink>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4 text-sm">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'
              }
            >
              {link.label}
            </NavLink>
          ))}
          {token ? (
            <>
              <NavLink to="/admin" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'}>
                Dashboard
              </NavLink>
              <NavLink to="/admin/create" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'}>
                Create
              </NavLink>
              <button onClick={handleLogout} className="hover:text-red-400">
                Logout
              </button>
            </>
          ) : (
            <NavLink to="/login" className={({ isActive }) => isActive ? 'text-yellow-400 font-semibold' : 'hover:text-yellow-300'}>
              Admin Login
            </NavLink>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700"
          >
            {isOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-gray-800">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium ${isActive ? 'text-yellow-400' : 'text-white hover:bg-gray-700'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            {token ? (
              <>  
                <NavLink to="/admin" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
                  Dashboard
                </NavLink>
                <NavLink to="/admin/create" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
                  Create
                </NavLink>
                <button onClick={handleLogout} className="block px-3 py-2 rounded-md text-base font-medium text-red-500 hover:bg-gray-700">
                  Logout
                </button>
              </>
            ) : (
              <NavLink to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 rounded-md text-base font-medium text-white hover:bg-gray-700">
                Admin Login
              </NavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}