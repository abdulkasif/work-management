import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const QuickActions = () => {
  const navigate = useNavigate();

  const handleClick = (action) => {
    if (action === 'Add Client') {
      navigate('/add-client');
    }
    if (action === 'New Project') {
      navigate('/add-project');
    }
    if (action === 'Add Member') {
      navigate('/add-member');
    }
  };

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {['New Project', 'Add Member', 'Add Client'].map((action) => (
        <div
          className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#3d4a52] bg-[#17272f]  p-5"
          key={action}
        >
          <div className="flex flex-col gap-1">
            <p className="text-white text-base font-bold leading-tight">{action}</p>
            <p className="text-[#9eadb7] text-base font-normal leading-normal">
              {`Invite a new ${action.split(' ')[1].toLowerCase()} to your workspace`}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: '#1d8cd7' }} // Animation on hover
            whileTap={{ scale: 0.95 }} // Animation on tap
            onClick={() => handleClick(action)}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-300 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-400 hover:to-emerald-400 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            <span className="truncate">Create New</span>
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default QuickActions;
