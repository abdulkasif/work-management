// src/pages/Home.js
import React from 'react';
import MonthlyRevenueChart from '../components/homecomponents/MonthlyRevenueChart';
import Overview from '../components/homecomponents/Overview';
import QuickActions from '../components/homecomponents/QuickActions';
import Header from '../components/Header';
import MemberHomePage from './assignpages/MemberHomePage';
import FetchMemberDetails from '../components/FetchMemberDetails';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 bg-opacity-100 bg-cover bg-center backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <Header />
      <div className="px-4 md:px-40 flex flex-1 justify-center py-5">
        <div className="layout-content-container flex flex-col max-w-[960px] w-full flex-1">
          <QuickActions />
          <FetchMemberDetails />
        </div>
      </div>
    </div>
  );
};

export default Home;
