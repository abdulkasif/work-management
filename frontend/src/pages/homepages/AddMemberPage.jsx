import React, { useEffect, useState } from "react";
import Header from "../../components/Header"; // Adjust the path as necessary
import { Lock } from "lucide-react"; // Assuming you're using react-feather icons
import PasswordStrengthMeter from "../../components/PaswordStrengthMeter";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook

function AddMemberPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location object to get data from navigation
  const existingMember = location.state?.member; // Get existing member data if available

  const [formData, setFormData] = useState({
    id: existingMember?.id || "",
    name: existingMember?.name || "",
    sex: existingMember?.sex || "",
    designation: existingMember?.designation || "",
    address: existingMember?.address || "",
    email: existingMember?.email || "",
    password: existingMember?.password || "",
    mobileNo: existingMember?.mobileNo || "",
    pan: existingMember?.pan || "",
    gst: existingMember?.gst || "",
    tdsApplicable: existingMember?.tdsApplicable || "",
    accountNumber: existingMember?.accountNumber || "",
    ifsc: existingMember?.ifsc || "",
    salaryType: existingMember?.salaryType || "",
    salary: existingMember?.salary || "",
    employeeType: existingMember?.employeeType || "",
  });

  const [password, setPassword] = useState(""); // New password state
  const [isPasswordFocused, setIsPasswordFocused] = useState(false); // State to track focus
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "password") {
      // Update password directly in formData when password field changes
      setFormData({ ...formData, password: value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = { ...formData };
    console.log(formDataToSend);

    const method = existingMember ? "PUT" : "POST";
    
    const url = existingMember ?`http://localhost:8080/api/home/editmember/${existingMember._id}`: `http://localhost:8080/api/home/member`;
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formDataToSend), // Send as JSON
      });

      if (response.ok) {
        alert(
          existingMember
            ? "Member updated successfully!"
            : "Member added successfully!"
        );
        navigate('/members');
      } else {
        console.error("Failed to add or update member:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      window.location.reload();
    }
  }, [isSubmitted]);

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
               {existingMember ? "Update Member" : "Add Member"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <InputField
              label="Enter ID"
              name="id"
              placeholder="12345"
              value={formData.id}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter Name"
              name="name"
              placeholder="John Doe"
              value={formData.name}
              onChange={handleInputChange}
            />
            <SelectField
              label="Select Sex"
              name="sex"
              options={["Male", "Female"]}
              value={formData.sex}
              onChange={handleInputChange}
            />
            <SelectField
              label="Select Designation"
              name="designation"
              options={["Member", "Team Lead", "Manager"]}
              value={formData.designation}
              onChange={handleInputChange}
            />
            <TextArea
              label="Enter Address"
              name="address"
              placeholder="123 Main St."
              value={formData.address}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter Email"
              name="email"
              placeholder="example@example.com"
              value={formData.email}
              onChange={handleInputChange}
            />

            {/* Password Input Field */}
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">
                Enter Password
              </p>
              <div className="relative">
                <input
                  type="password" // Change to 'password' type for better security
                  name="password"
                  placeholder="Password"
                  value={formData.password} // Bind the password to formData
                  onFocus={() => setIsPasswordFocused(true)} // Set focus state
                  onBlur={() => setIsPasswordFocused(false)} // Reset on blur
                  onChange={handleInputChange} // Handle input changes
                  className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
                />
              </div>
              {/* Show Password Strength Meter when the field is focused */}
              {isPasswordFocused && (
                <PasswordStrengthMeter password={formData.password} />
              )}
            </label>

            {/* Other fields */}
            <InputField
              label="Enter Mobile No"
              name="mobileNo"
              placeholder="123-456-7890"
              value={formData.mobileNo}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter PAN"
              name="pan"
              placeholder="ABCDE1234F"
              value={formData.pan}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter GST"
              name="gst"
              placeholder="27ABCDE1234F1Z5"
              value={formData.gst}
              onChange={handleInputChange}
            />
            <RadioField
              label="Enter TDS Applicable"
              name="tdsApplicable"
              options={["Yes", "No"]}
              value={formData.tdsApplicable}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter Account Number"
              name="accountNumber"
              placeholder="1234567890"
              value={formData.accountNumber}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter IFSC"
              name="ifsc"
              placeholder="ABC123456789"
              value={formData.ifsc}
              onChange={handleInputChange}
            />
            <RadioField
              label="Salary Type"
              name="salaryType"
              options={["Monthly", "Hourly"]}
              value={formData.salaryType}
              onChange={handleInputChange}
            />
            <InputField
              label="Enter Salary"
              name="salary"
              placeholder="50000"
              type="number"
              value={formData.salary}
              onChange={handleInputChange}
            />
            <SelectField
              label="Employee Type"
              name="employeeType"
              options={["Monthly wise with PF", "Monthly wise with ESI"]}
              value={formData.employeeType}
              onChange={handleInputChange}
            />

            <div className="flex justify-end mt-6">
              <button
                type="button"
                className="flex-1 h-12 bg-gray-700 text-white rounded-lg font-bold mr-2 transition duration-200 hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 h-12 bg-green-600 text-white rounded-lg font-bold ml-2 transition duration-200 hover:bg-green-500"
              >
                {existingMember ? "Update Member" : "Add Member"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const InputField = ({
  label,
  name,
  placeholder,
  type = "text",
  value,
  onChange,
}) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <input
      name={name}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
    />
  </label>
);

const TextArea = ({ label, name, placeholder, value, onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="form-input w-full rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 p-4"
    />
  </label>
);

const SelectField = ({ label, name, options = [], value, onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 px-4"
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  </label>
);

const RadioField = ({ label, name, options = [], value, onChange }) => (
  <label className="flex flex-col mb-4">
    <p className="text-white text-base font-medium pb-2">{label}</p>
    <div className="flex space-x-6">
      {options.map((option, index) => (
        <div key={index} className="flex items-center">
          <input
            type="radio"
            name={name}
            value={option}
            checked={value === option}
            onChange={onChange}
            className="form-radio text-green-500"
          />
          <span className="text-white ml-2">{option}</span>
        </div>
      ))}
    </div>
  </label>
);

export default AddMemberPage;
