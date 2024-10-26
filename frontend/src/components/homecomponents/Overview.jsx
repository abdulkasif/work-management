import React from 'react';

const Overview = () => {
  return (
    <div>
    <h2 className="text-white text-[22px] font-bold leading-tight tracking-[-0.015em] px-4 pb-3 pt-5">Overview</h2>
    <div className="flex flex-wrap gap-4 p-4">
      {['Total Pages', 'Revenue', 'Expenses'].map((item) => (
        <div className="flex min-w-[158px] flex-1 flex-col gap-2 rounded-xl p-6 bg-[#17272f] " key={item}> {/* Updated background color */}
          <p className="text-white text-base font-medium leading-normal">{item}</p>
          <p className="text-white tracking-light text-2xl font-bold leading-tight">
            {item === 'Total Pages' ? '1,340' : item === 'Revenue' ? '$12,000' : '$9,000'}
          </p>
        </div>
      ))}
    </div>
  </div>
  );
};

export default Overview;
