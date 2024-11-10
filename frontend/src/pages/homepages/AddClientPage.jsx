import React, { useState } from "react";
import Header from "../../components/Header";
import Inputclient from "../../components/homecomponents/Inputclient";
import { FiUser, FiMapPin, FiGlobe, FiDollarSign, FiMail, FiPhone } from "react-icons/fi";

function AddClientPage() {
  const [clientData, setClientData] = useState({
    clientId: "",
    clientName: "",
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    country: "",
    currency: "",
    paymentTerms: ""
  });

  const handleChange = (field, value) => {
    setClientData((prevData) => ({
      ...prevData,
      [field]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/api/home/client", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(clientData)
      });

      if (response.ok) {
        alert("Client added successfully!");
        setClientData({
          clientId: "",
          clientName: "",
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          address: "",
          country: "",
          currency: "",
          paymentTerms: ""
        });
      } else {
        console.error("Failed to add client");
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
            Add New Client
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Inputclient icon={FiUser} placeholder="Client ID" onChange={(e) => handleChange("clientId", e.target.value)} />
            <Inputclient icon={FiUser} placeholder="Client Name" onChange={(e) => handleChange("clientName", e.target.value)} />
            <Inputclient icon={FiUser} placeholder="First Name" onChange={(e) => handleChange("firstName", e.target.value)} />
            <Inputclient icon={FiUser} placeholder="Last Name" onChange={(e) => handleChange("lastName", e.target.value)} />
            <Inputclient icon={FiMail} placeholder="Email" onChange={(e) => handleChange("email", e.target.value)} />
            <Inputclient icon={FiPhone} placeholder="Phone" onChange={(e) => handleChange("phone", e.target.value)} />
            <Inputclient icon={FiMapPin} placeholder="Address" onChange={(e) => handleChange("address", e.target.value)} />
            <Inputclient icon={FiGlobe} placeholder="Country" onChange={(e) => handleChange("country", e.target.value)} />
            <Inputclient icon={FiDollarSign} placeholder="Currency" onChange={(e) => handleChange("currency", e.target.value)} />
            <Inputclient icon={FiUser} placeholder="Payment Terms" onChange={(e) => handleChange("paymentTerms", e.target.value)} />
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => setClientData({})}
                className="flex-1 mr-2 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 ml-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200"
              >
                Add Client
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddClientPage;
