import React from "react";
import Header from "../../components/Header";
import Inputclient from "../../components/homecomponents/Inputclient";
import { FiUser, FiMapPin, FiGlobe, FiDollarSign, FiMail, FiPhone } from "react-icons/fi";

function AddClientPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Add New Client</h2>

          <form className="space-y-4">
            <Inputclient icon={FiUser} placeholder="Client ID" />
            <Inputclient icon={FiUser} placeholder="Client Name" />
            <Inputclient icon={FiMapPin} placeholder="Address" />
            <Inputclient icon={FiGlobe} placeholder="Country" />
            <Inputclient icon={FiDollarSign} placeholder="Currency" />
            <Inputclient icon={FiUser} placeholder="Payment Terms" />
            <Inputclient icon={FiUser} placeholder="First Name" />
            <Inputclient icon={FiUser} placeholder="Last Name" />
            <Inputclient icon={FiMail} placeholder="Email" />
            <Inputclient icon={FiPhone} placeholder="Phone" />
          </form>

          <div className="flex justify-between mt-8">
            <button className="flex-1 mr-2 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition duration-200">
              Cancel
            </button>
            <button className="flex-1 ml-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200">
              Add Client
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddClientPage;
