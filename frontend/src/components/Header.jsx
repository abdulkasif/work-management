import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from './SearchBar';
import ProfilePicture from './ProfilePicture';

const Header = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#293238] bg-[#222222] px-10 py-3"> {/* Updated background color */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <h2 className="text-white text-lg font-bold leading-tight">Acme Co</h2>
        </div>
        <nav className="flex items-center gap-9">
          {['Home', 'Clients', 'Members', 'Projects', 'Invoices'].map((item) => (
            <motion.a
              key={item}
              href={`/${item.toLowerCase()}`} // Unique href link for each item
              className="text-white text-sm font-medium leading-normal"
              whileHover={{ scale: 1.05, color: '#1d8cd7' }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on tap
            >
              {item}
            </motion.a>
          ))}
        </nav>
      </div>
      <div className="flex flex-1 justify-end gap-8">
        <SearchBar />
        <ProfilePicture />
      </div>
    </header>
  );
};

export default Header;
