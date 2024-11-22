import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";
import {
  FaEnvelope,
  FaIdBadge,
  FaPhone,
  FaTrashAlt,
  FaEdit,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ShowClientPage = () => {
  const navigate = useNavigate();

  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedClient, setExpandedClient] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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

  const handleCardClick = (clientId) => {
    setExpandedClient((prev) => (prev === clientId ? null : clientId));
  };

  const handleEdit = (client) => {
    navigate("/add-client", { state: { client } });
  };

  const handleDelete = async (clientId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/home/deleteclient/${clientId}`,
        { method: "DELETE" }
      );

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setClientData(clientData.filter((client) => client._id !== clientId));
    } catch (error) {
      console.error("Failed to delete client:", error);
    }
  };

  const paginatedClients = clientData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-500">
          Client Details
        </h1>

        {/* Client List */}
        <div className="w-full max-w-4xl space-y-6">
          {paginatedClients.map((client) => (
            
            <div
              key={client._id}
              className="p-10 border-2 border-gray-600 rounded-lg shadow-lg bg-gray-800 hover:shadow-2xl transition-all duration-300"
              onClick={() => handleCardClick(client._id)} // Card click handler
            >
              {/* Header of the card with Edit/Delete buttons */}
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-300">
                  {client.clientName}
                </p>
                <div className="flex gap-4">
                  {/* Edit button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleEdit(client);
                    }}
                    className="text-blue-500 hover:text-blue-700 transition-all"
                  >
                    <FaEdit size={20} />
                  </button>
                  {/* Delete button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent card click
                      handleDelete(client._id);
                    }}
                    className="text-red-500 hover:text-red-700 transition-all"
                  >
                    <FaTrashAlt size={20} />
                  </button>
                </div>
              </div>

              {/* Show Client Details when expanded */}
              {expandedClient === client._id && (
                <div className="space-y-3 mt-4">
                  <p className="flex items-center gap-4 text-lg text-gray-300">
                    <FaIdBadge className="text-emerald-500" />
                    <strong>ID:</strong> {client.clientId}
                  </p>
                  <p className="flex items-center gap-4 text-lg text-gray-300">
                    <FaEnvelope className="text-emerald-500" />
                    <strong>Email:</strong> {client.email}
                  </p>
                  <p className="flex items-center gap-4 text-lg text-gray-300">
                    <FaPhone className="text-emerald-500" />
                    <strong>Phone:</strong> {client.phone}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: Math.ceil(clientData.length / itemsPerPage) }).map(
            (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-2 rounded ${
                  currentPage === i + 1
                    ? "bg-emerald-500 text-white"
                    : "bg-gray-700 text-gray-400 hover:bg-gray-600"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowClientPage;
