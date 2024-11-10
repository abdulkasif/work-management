// src/pages/Home.js
import React from 'react';
import MonthlyRevenueChart from '../components/homecomponents/MonthlyRevenueChart';
import Overview from '../components/homecomponents/Overview';
import QuickActions from '../components/homecomponents/QuickActions';
import Header from '../components/Header';


const Home = () => {
  return (
    <>
      <div className="flex flex-col min-h-screen bg-sky-500 bg-opacity-90 bg-[url('/assets/images/background.png')] 
    bg-cover bg-center backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">



      <Header />
      <div className="px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
          <QuickActions />
          <Overview />
          <MonthlyRevenueChart /> 
        </div>
      </div>
      </div>
    {/* </div> bg-sky-200 */}

    </>
  );
};

export default Home;
