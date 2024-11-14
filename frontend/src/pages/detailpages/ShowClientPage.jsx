import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import { FaUser, FaEnvelope, FaIdBadge, FaEdit, FaTrashAlt, FaPhone } from "react-icons/fa";

const ShowClientPage = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteInput, setDeleteInput] = useState('');
  const [selectedClientId, setSelectedClientId] = useState(null);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [editClientData, setEditClientData] = useState({
    clientName: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/home/getclient", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setClientData(result.data);
        } else throw new Error("Unexpected response format");
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (clientId) => {
    setSelectedClientId(clientId);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (deleteInput === "Delete") {
      try {
        const response = await fetch(`http://localhost:8080/api/home/deleteclient/${selectedClientId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        setClientData(clientData.filter((client) => client._id !== selectedClientId));
        alert("Client deleted successfully");
      } catch (error) {
        console.error("Failed to delete client:", error);
      } finally {
        setDeleteConfirmVisible(false);
        setDeleteInput('');
      }
    } else {
      alert("Please type 'Delete' to confirm.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setDeleteInput('');
  };

  const handleEdit = (client) => {
    setEditClientData({
      clientName: client.clientName,
      email: client.email,
      phone: client.phone,
    });
    setSelectedClientId(client._id);
    setEditModalVisible(true);
  };

  const handleEditSave = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/home/editclient/${selectedClientId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editClientData),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const updatedClient = await response.json();
      setClientData(clientData.map((client) => 
        client._id === selectedClientId ? updatedClient : client
      ));
      alert("Client updated successfully");
      setEditModalVisible(false);
    } catch (error) {
      console.error("Failed to update client:", error);
    }
  };

  const handleEditCancel = () => {
    setEditModalVisible(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center">Client Details</h1>
      {clientData.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {clientData.map((client) => (
              <div
                key={client._id}
                className="p-6 border-2 border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800"
              >
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-lg">
                    <FaIdBadge size={20} />
                    <strong>ID:</strong> {client.clientId}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaUser size={20} />
                    <strong>Name:</strong> {client.clientName}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaEnvelope size={20} />
                    <strong>Email:</strong> {client.email}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaPhone size={20} />
                    <strong>Phone:</strong> {client.phone}
                  </p>
                </div>
                <div className="flex gap-6 justify-end mt-4">
                  <button
                    onClick={() => handleEdit(client)}
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(client._id)}
                    className="text-red-500 hover:text-red-700 transition-all duration-200"
                  >
                    <FaTrashAlt size={24} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No client data available.</p>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-end">
              <button
                onClick={cancelDelete}
                className="text-white text-xl font-bold"
              >
                X
              </button>
            </div>
            <h3 className="text-xl text-center mb-4 text-red-500">
              Are you sure you want to delete this client?
            </h3>
            <p className="text-center text-white mb-4">
              Please type <strong>"Delete"</strong> to confirm:
            </p>
            <input
              type="text"
              value={deleteInput}
              onChange={(e) => setDeleteInput(e.target.value)}
              className="w-full p-2 rounded bg-gray-700 text-white mb-4"
              placeholder="Type 'Delete' to confirm"
            />
            <div className="flex justify-between">
              <button
                onClick={cancelDelete}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-600 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-end">
              <button
                onClick={handleEditCancel}
                className="text-white text-xl font-bold"
              >
                X
              </button>
            </div>
            <h3 className="text-xl text-center mb-4 text-blue-500">Edit Client</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={editClientData.clientName}
                onChange={(e) => setEditClientData({ ...editClientData, clientName: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Name"
              />
              <input
                type="email"
                value={editClientData.email}
                onChange={(e) => setEditClientData({ ...editClientData, email: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Email"
              />
              <input
                type="text"
                value={editClientData.phone}
                onChange={(e) => setEditClientData({ ...editClientData, phone: e.target.value })}
                className="w-full p-2 rounded bg-gray-700 text-white"
                placeholder="Phone"
              />
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleEditCancel}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleEditSave}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowClientPage;
