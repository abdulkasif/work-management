import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Inputclient from "../../components/homecomponents/Inputclient";
import {
  FiUser,
  FiMapPin,
  FiGlobe,
  FiDollarSign,
  FiMail,
  FiPhone,
} from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";

function AddClientPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingClient = location.state?.client;

  const [clientData, setClientData] = useState({
    clientId: existingClient?.clientId || "",
    clientName: existingClient?.clientName || "",
    firstName: existingClient?.firstName || "",
    lastName: existingClient?.lastName || "",
    email: existingClient?.email || "",
    phone: existingClient?.phone || "",
    address: existingClient?.address || "",
    country: existingClient?.country || "",
    currency: existingClient?.currency || "",
    paymentTerms: existingClient?.paymentTerms || "",
  });

  const [originalData, setOriginalData] = useState(existingClient || {});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [confirmationVisible, setConfirmationVisible] = useState(false);
  const [changes, setChanges] = useState({});

  const handleChange = (field, value) => {
    setClientData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleEditChanges = () => {
    const detectedChanges = {};
    for (const key in clientData) {
      if (clientData[key] !== originalData[key]) {
        detectedChanges[key] = {
          original: originalData[key],
          updated: clientData[key],
        };
      }
    }
    if (Object.keys(detectedChanges).length > 0) {
      setChanges(detectedChanges);
      setConfirmationVisible(true);
    } else {
      alert("No changes detected!");
    }
  };

  const confirmChanges = async () => {
    setConfirmationVisible(false);
    
    const method = existingClient ? "PUT" : "POST" 

    const url = existingClient ? `https://rjvn06q4-8080.inc1.devtunnels.ms/api/home/editclient/${existingClient._id}`: 'https://rjvn06q4-8080.inc1.devtunnels.ms/api/home/client';
    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
       
        navigate('/clients');
      } else {
        console.error("Failed to update client data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const cancelChanges = () => {
    setConfirmationVisible(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            {existingClient ? "Edit Client" : "Add Client"}
          </h2>

          <form className="space-y-4">
            <Inputclient
              icon={FiUser}
              placeholder="Client ID"
              value={clientData.clientId}
              onChange={(e) => handleChange("clientId", e.target.value)}
            />
            <Inputclient
              icon={FiUser}
              placeholder="Client Name"
              value={clientData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
            <Inputclient
              icon={FiUser}
              placeholder="First Name"
              value={clientData.firstName}
              onChange={(e) => handleChange("firstName", e.target.value)}
            />
            <Inputclient
              icon={FiUser}
              placeholder="Last Name"
              value={clientData.lastName}
              onChange={(e) => handleChange("lastName", e.target.value)}
            />
            <Inputclient
              icon={FiMail}
              placeholder="Email"
              value={clientData.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
            <Inputclient
              icon={FiPhone}
              placeholder="Phone"
              value={clientData.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
            />
            <Inputclient
              icon={FiMapPin}
              placeholder="Address"
              value={clientData.address}
              onChange={(e) => handleChange("address", e.target.value)}
            />
            <Inputclient
              icon={FiGlobe}
              placeholder="Country"
              value={clientData.country}
              onChange={(e) => handleChange("country", e.target.value)}
            />
            <Inputclient
              icon={FiDollarSign}
              placeholder="Currency"
              value={clientData.currency}
              onChange={(e) => handleChange("currency", e.target.value)}
            />
            <Inputclient
              icon={FiUser}
              placeholder="Payment Terms"
              value={clientData.paymentTerms}
              onChange={(e) => handleChange("paymentTerms", e.target.value)}
            />

            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate('/home')}
                className="flex-1 mr-2 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleEditChanges}
                className="flex-1 ml-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200"
              >
                {existingClient ? "Edit Changes" : "Add Client"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {confirmationVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl text-center mb-4 text-green-500">Confirm Changes</h3>
            <ul className="text-white mb-4">
              {Object.entries(changes).map(([key, value]) => (
                <li key={key} className="mb-2">
                  <strong>{key}:</strong> {value.original || "N/A"} →{" "}
                  {value.updated || "N/A"}
                </li>
              ))}
            </ul>
            <div className="flex justify-between">
              <button
                onClick={cancelChanges}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmChanges}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddClientPage;
