import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBars, FaTimes } from 'react-icons/fa';
import SearchBar from './SearchBar';
import ProfilePicture from './ProfilePicture';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isTeamLead, setIsTeamLead] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user.designation === 'Team Lead') {
      setIsTeamLead(true);
    }
    if(user.designation === 'Member'){
      setIsMember(true);
    }
  }, []);

  const navigationItems = ['Home', 'Clients', 'Members', 'Projects', 'Invoices'];

  return (
    <header className="flex items-center justify-between border-b border-solid border-b-[#293238] bg-[#222222] px-6 py-3 md:px-10">
      {/* Logo */}
      <h2 className="text-white text-lg font-bold">Marine Apps</h2>

      {/* Left Section: Search Bar and Hamburger Menu */}
      <div className="flex items-center gap-4 md:hidden">
        <div className="w-32 sm:w-48">
          <SearchBar />
        </div>
        <button
          onClick={toggleMenu}
          className="text-white text-2xl focus:outline-none"
          aria-label="Toggle Menu"
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Navigation Menu */}
      <nav
        className={`fixed inset-y-0 right-0 z-50 w-64 bg-[#222222] shadow-lg p-6 transform ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        } transition-transform duration-300 md:relative md:transform-none md:bg-transparent md:w-auto md:flex md:items-center`}
      >
        <ul className="space-y-6 text-white text-sm font-medium md:space-y-0 md:space-x-9 md:flex md:items-center">
          <li className="md:hidden">
            <ProfilePicture />
          </li>
          {navigationItems.map((item) => {
            if (isMember) return null;
            if (isTeamLead && item === 'Clients') return null;
            return (
              <li key={item}>
                <motion.a
                  href={`/${item.toLowerCase()}`}
                  className="block text-white leading-normal md:inline-block"
                  whileHover={{ scale: 1.05, color: '#009B77' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item}
                </motion.a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Desktop-only Items */}
      <div className="hidden md:flex flex-1 justify-end gap-8 md:gap-x-6">
        <SearchBar />
        <ProfilePicture />
      </div>

      {/* Overlay for Mobile Menu */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden"
          onClick={toggleMenu}
        ></div>
      )}
    </header>
  );
};

export default Header;
