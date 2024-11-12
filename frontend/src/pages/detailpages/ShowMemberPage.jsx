import { Thermometer } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const ShowMemberPage = () => {
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/home/getmember",
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

        if (result.success && Array.isArray(result.data)) {
          setMemberData(result.data);
        } else {
          throw new Error("Unexpected response Format");
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
      <h1>Members Details</h1>
      {memberData.length > 0 ? (
        <div>
          {memberData.map((member) => (
            <div
              key={member._id}
              className="mb-4 p-4 border border-gray-700 rounded"
            >
              <p>
                <strong>ID:</strong> {member.id}
              </p>
              <p>
                <strong>Name:</strong> {member.name}
              </p>
              <p>
                <strong>Email:</strong> {member.email}
              </p>
              <p>
                <strong>Designation:</strong> {member.designation}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No member details found.</p>
      )}
    </div>
  );
};

export default ShowMemberPage;
