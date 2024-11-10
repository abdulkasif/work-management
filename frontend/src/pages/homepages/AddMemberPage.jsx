import React, { useState } from "react";
import Header from "../../components/Header"; // Adjust the path as necessary
import { Lock } from "lucide-react"; // Assuming you're using react-feather icons
import PasswordStrengthMeter from "../../components/PaswordStrengthMeter";


function AddMemberPage() {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    sex: "",
    designation: "",
    address: "",
    email: "",
    mobileNo: "",
    pan: "",
    gst: "",
    tdsApplicable: "",
    accountNumber: "",
    ifsc: "",
    salaryType: "",
    salary: "",
    employeeType: "",
  });
  
  const [password, setPassword] = useState(""); // New password state
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // State to track focus

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = { ...formData, password }; 
    console.log(formDataToSend);
    // Add password to form data

    try {
      const response = await fetch("http://localhost:8080/api/home/member", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend), // Send as JSON
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Member added successfully:", result);
      } else {
        console.error("Failed to add member:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">Add Member</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField label="Enter ID" name="id" placeholder="12345" onChange={handleInputChange} />
            <InputField label="Enter Name" name="name" placeholder="John Doe" onChange={handleInputChange} />
            <SelectField label="Select Sex" name="sex" options={["Male", "Female"]} onChange={handleInputChange} />
            <SelectField label="Select Designation" name="designation" options={["Member", "Team Lead", "Manager"]} onChange={handleInputChange} />
            <TextArea label="Enter Address" name="address" placeholder="123 Main St." onChange={handleInputChange} />
            <InputField label="Enter Email" name="email" placeholder="example@example.com" onChange={handleInputChange} />

            {/* Password Input Field */}
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">Enter Password</p>
              <div className="relative">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={password}
                  onFocus={() => setIsPasswordFocused(true)} // Set focus state
                  onBlur={() => setIsPasswordFocused(false)} // Reset on blur
                  onChange={(e) => setPassword(e.target.value)}
                  className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
                />
                
              </div>
              {/* Show Password Strength Meter when the field is focused */}
              {isPasswordFocused && <PasswordStrengthMeter password={password} />}
            </label>

            {/* Other fields */}
            <InputField label="Enter Mobile No" name="mobileNo" placeholder="123-456-7890" onChange={handleInputChange} />
            <InputField label="Enter PAN" name="pan" placeholder="ABCDE1234F" onChange={handleInputChange} />
            <InputField label="Enter GST" name="gst" placeholder="27ABCDE1234F1Z5" onChange={handleInputChange} />
            <RadioField label="Enter TDS Applicable" name="tdsApplicable" options={["Yes", "No"]} onChange={handleInputChange} />
            <InputField label="Enter Account Number" name="accountNumber" placeholder="1234567890" onChange={handleInputChange} />
            <InputField label="Enter IFSC" name="ifsc" placeholder="ABC123456789" onChange={handleInputChange} />
            <RadioField label="Salary Type" name="salaryType" options={["Monthly", "Hourly"]} onChange={handleInputChange} />
            <InputField label="Enter Salary" name="salary" placeholder="50000" type="number" onChange={handleInputChange} />
            <SelectField label="Employee Type" name="employeeType" options={["Monthly wise with PF", "Monthly wise with ESI"]} onChange={handleInputChange} />
          
            <div className="flex justify-end mt-6">
              <button type="button" className="flex-1 h-12 bg-gray-700 text-white rounded-lg font-bold mr-2 transition duration-200 hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" className="flex-1 h-12 bg-green-600 text-white rounded-lg font-bold ml-2 transition duration-200 hover:bg-green-500">
                Add Member
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}



const InputField = ({ label, name, placeholder, type = "text", onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      onChange={onChange}
      className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
    />
  </label>
);

const TextArea = ({ label, name, placeholder, onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <textarea
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="form-input w-full rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 p-4"
    />
  </label>
);

const SelectField = ({ label, name, options = [], onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <select name={name} onChange={onChange} className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4">
      <option value="">Select...</option>
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const RadioField = ({ label, name, options = [], onChange }) => (
  <fieldset className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <div className="flex gap-4">
      {options.map((option, index) => (
        <label key={index} className="text-white flex items-center">
          <input
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            className="form-radio text-green-500 focus:ring-2 focus:ring-green-500 mr-2"
          />
          {option}
        </label>
      ))}
    </div>
  </fieldset>
);
export default AddMemberPage;
