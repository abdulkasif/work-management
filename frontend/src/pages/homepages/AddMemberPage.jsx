import React, { useEffect, useState } from "react";
import Header from "../../components/Header"; // Adjust the path as necessary
import PasswordStrengthMeter from "../../components/PasswordStrengthMeter";
import { useLocation, useNavigate } from "react-router-dom"; // Import useLocation hook

function AddMemberPage() {
  const navigate = useNavigate();
  const location = useLocation(); // Access location object to get data from navigation
  const existingMember = location.state?.member; // Get existing member data if available

  const initialFormData = {
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
  };

  const [formData, setFormData] = useState(initialFormData);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [changedFields, setChangedFields] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Track changes
    if (value !== initialFormData[name]) {
      setChangedFields((prev) => ({ ...prev, [name]: value }));
    } else {
      setChangedFields((prev) => {
        const updated = { ...prev };
        delete updated[name];
        return updated;
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = existingMember ? "PUT" : "POST";
    const url = existingMember
      ? `http://localhost:8080/api/home/editmember/${existingMember._id}`
      : `http://localhost:8080/api/home/member`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Send as JSON
      });

      if (response.ok) {
        navigate("/members");
      } else {
        console.error("Failed to add or update member:", response.statusText);
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
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            {existingMember ? "Update Member" : "Add Member"}
          </h2>

          {Object.keys(changedFields).length > 0 && (
            <div className="bg-gray-700 p-4 rounded-lg mb-6">
              <h3 className="text-lg font-bold text-green-400 mb-2">Changes:</h3>
              <ul className="text-white">
                {Object.entries(changedFields).map(([key, value]) => (
                  <li key={key}>
                    <span className="font-bold">{key}:</span> {value}
                  </li>
                ))}
              </ul>
            </div>
          )}

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
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">Enter Password</p>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onFocus={() => setIsPasswordFocused(true)}
                onBlur={() => setIsPasswordFocused(false)}
                onChange={handleInputChange}
                className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
              />
              {isPasswordFocused && (
                <PasswordStrengthMeter password={formData.password} />
              )}
            </label>
            {/* Other Input Fields */}
            {/* ... (similar to above) */}
            <div className="flex justify-end mt-6">
              <button
                type="button"
                onClick={() => navigate("/members")}
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

const InputField = ({ label, name, placeholder, value, onChange, type = "text" }) => (
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

// Other components (TextArea, SelectField, etc.) remain the same

export default AddMemberPage;
