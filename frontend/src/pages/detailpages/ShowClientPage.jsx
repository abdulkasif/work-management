import React, { useEffect, useState } from "react";
import Header from "../../components/Header.jsx";

const ShowClientPage = () => {
  const [clientData, setClientData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/home/getclient",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log(result);

        // Check if data is within a nested structure
        if (result.success && Array.isArray(result.data)) {
          setClientData(result.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <h1>Client Details</h1>
      {clientData.length > 0 ? (
        <div>
          {clientData.map((client) => (
            <div
              key={client._id}
              className="mb-4 p-4 border border-gray-700 rounded"
            >
              <p>
                <strong>ID:</strong> {client.clientId}
              </p>
              <p>
                <strong>Name:</strong> {client.clientName}
              </p>
              <p>
                <strong>Email:</strong> {client.email}
              </p>
              <p>
                <strong>Phone:</strong> {client.phone}
              </p>
              <p>
                <strong>Address:</strong> {client.address}
              </p>
              {/* Add more fields if necessary */}
            </div>
          ))}
        </div>
      ) : (
        <p>No client data available.</p>
      )}
    </div>
  );
};

export default ShowClientPage;
