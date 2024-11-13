import { Thermometer } from "lucide-react";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header";

const ShowProjectPage = () => {
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/home/getproject",
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
          setProjectData(result.data);
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
      <h1>Project Details</h1>
      {projectData.length > 0 ? (
        <div>
          {projectData.map((project) => (
            <div
              key={project._id}
              className="mb-4 p-4 border border-gray-700 rounded"
            >
              <p>
                <strong>ID:</strong> {project.projectId}
              </p>
              <p>
                <strong>Name:</strong> {project.client}
              </p>
              <p>
                <strong>Email:</strong> {project.title}
              </p>
              <p>
                <strong>Designation:</strong> {project.pages}
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

export default ShowProjectPage;