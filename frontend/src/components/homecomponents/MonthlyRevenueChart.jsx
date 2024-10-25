import React from 'react';


const MonthlyRevenueChart = () => {
  return (
    <div className="flex flex-wrap gap-4 px-4 py-6">
      <div className="flex min-w-72 flex-1 flex-col gap-2 rounded-xl border border-[#3d4a52] bg-[#2a2a3e] p-6">
        <p className="text-white text-base font-medium leading-normal">Monthly Revenue</p>
        <div className="flex min-h-[180px] flex-1 flex-col gap-8 py-4">
          <svg width="100%" height="148" viewBox="-3 0 478 150" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
            <path
              d="M0 109C18.1538 109 18.1538 21 36.3077 21C54.4615 21 54.4615 41 72.6154 41C90.7692 41 90.7692 93 108.923 93C127.077 93 127.077 33 145.231 33C163.385 33 163.385 101 181.538 101C199.692 101 199.692 61 217.846 61C236 61 236 45 254.154 45C272.308 45 272.308 121 290.462 121C308.615 121 308.615 149 326.769 149C344.923 149 344.923 133 363.077 133C381.231 133 381.231 21 399.385 21C417.538 21 417.538 97 435.692 97C453.846 97 453.846 109 472 109"
              fill="rgba(29,140,215,1)"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default MonthlyRevenueChart;
