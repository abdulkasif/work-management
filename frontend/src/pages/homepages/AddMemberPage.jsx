import React from "react";
import Header from "../../components/Header"; // Adjust the path as necessary
import { FiChevronDown } from "react-icons/fi"; // Import any icon you need

function AddMemberPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />

      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Add Member</h2>
          <form className="space-y-4">
            <InputField label="Enter ID" placeholder="12345" />
            <InputField label="Enter Name" placeholder="John Doe" />
            <SelectField label="Select Sex" options={["Male", "Female"]} />
            <SelectField label="Select Designation" options={["Member", "Team Lead", "Manager"]} />
            <TextArea label="Enter Address" placeholder="123 Main St." />
            <InputField label="Enter Email" placeholder="example@example.com" />
            <InputField label="Enter Mobile No" placeholder="123-456-7890" />
            <InputField label="Enter PAN" placeholder="ABCDE1234F" />
            <InputField label="Enter GST" placeholder="27ABCDE1234F1Z5" />
            <RadioField label="Enter TDS Applicable" options={["Yes", "No"]} name="tdsApplicable" />
            <InputField label="Enter Account Number" placeholder="1234567890" />
            <InputField label="Enter IFSC" placeholder="ABC123456789" />
            <RadioField label="Salary Type" options={["Monthly", "Hourly"]} name="salaryType" />
            <InputField label="Enter Salary" placeholder="50000" type="number" />
            <SelectField label="Employee Type" options={["Monthly wise with PF","Monthly wise with ESI"]} />
            <FileInputField label="Upload File" />
          </form>
          <div className="flex justify-end mt-6">
            <button className="flex-1 h-12 bg-gray-700 text-white rounded-lg font-bold mr-2 transition duration-200 hover:bg-gray-600">
              Cancel
            </button>
            <button className="flex-1 h-12 bg-green-600 text-white rounded-lg font-bold ml-2 transition duration-200 hover:bg-green-500">
              Add Member
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const InputField = ({ label, placeholder, type = "text" }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <input
      placeholder={placeholder}
      type={type}
      className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
    />
  </label>
);

const TextArea = ({ label, placeholder }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <textarea
      placeholder={placeholder}
      className="form-input w-full rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 p-4"
    />
  </label>
);

const SelectField = ({ label, options = [] }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <select className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4">
      <option value="">Select...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

// New component for radio button group
const RadioField = ({ label, options = [], name }) => (
  <fieldset className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <div className="flex gap-4">
      {options.map((option, index) => (
        <label key={index} className="text-white flex items-center">
          <input
            type="radio"
            name={name}
            value={option}
            className="form-radio text-green-500 focus:ring-2 focus:ring-green-500 mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  </fieldset>
);

const FileInputField = ({ label }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <input type="file" className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 placeholder-gray-400 px-4" />
  </label>
);

export default AddMemberPage;
