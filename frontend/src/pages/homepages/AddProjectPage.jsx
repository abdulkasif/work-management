import React from "react";
import Header from "../../components/Header";
import Input_product from "../../components/homecomponents/Input_product";
import { FiCalendar, FiDollarSign, FiFileText, FiHash } from "react-icons/fi";

function AddProjectPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">New Project</h2>
        <form className="space-y-4">
        <Input_product label="Project ID" placeholder="12345" icon={<FiHash />} />
        <Input_product label="Client" placeholder="Acme Co." />
        <Input_product label="Title/ISBN" placeholder="The Hobbit" icon={<FiFileText />} />
        <Input_product label="Pages" placeholder="100" type="number" />
       
        <label className="flex flex-col mb-4">
          <p className="text-white text-base font-medium pb-2">Input Type</p>
          <select
            className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
          >
            <option value="Physical">Physical</option>
            <option value="Digital">Digital</option>
          </select>
        </label>

        <Input_product label="Due Date" placeholder="MM/DD/YYYY" icon={<FiCalendar />} type="date" />
        <Input_product label="Cost" placeholder="$500" icon={<FiDollarSign />} type="number" />
        </form>
        <div className="flex justify-end mt-6">
          <button className="flex-1 h-12 bg-gray-700 text-white rounded-lg font-bold mr-2 transition duration-200 hover:bg-gray-600">
            Cancel
          </button>
          <button className="flex-1 h-12 bg-green-600 text-white rounded-lg font-bold ml-2 transition duration-200 hover:bg-green-500">
            Add Project
          </button>
         
        </div>
      </div>
      </div>
    </div>
  );
}

export default AddProjectPage;
