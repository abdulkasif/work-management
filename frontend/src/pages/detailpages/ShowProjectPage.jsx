import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  FaIdBadge,
  FaProjectDiagram,
  FaBuilding,
  FaFileAlt,
  FaEdit,
  FaTrashAlt,
} from "react-icons/fa"; // Icons for project fields
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ShowProjectPage = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // State for handling modals
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [selectedProjectId, setSelectedProjectId] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/home/getproject", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setProjectData(result.data);
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

  // Handle Delete
  const handleDelete = (projectId) => {
    setSelectedProjectId(projectId);
    setDeleteConfirmVisible(true);
  };

  const confirmDelete = async () => {
    if (deleteInput === "Delete") {
      try {
        const response = await fetch(
          `http://localhost:8080/api/home/deleteproject/${selectedProjectId}`,
          {
            method: "DELETE",
          }
        );
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        setProjectData(projectData.filter((project) => project._id !== selectedProjectId));
        alert("Project deleted successfully");
      } catch (error) {
        console.error("Failed to delete project:", error);
      } finally {
        setDeleteConfirmVisible(false);
        setDeleteInput("");
      }
    } else {
      alert("Please type 'Delete' to confirm.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setDeleteInput("");
  };

  // Handle Edit
  const handleEdit = (project) => {
    navigate("/add-project", { state: { project } });
  };



  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center">Project Details</h1>
      {projectData.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {projectData.map((project) => (
              <div
                key={project._id}
                className="p-6 border-2 border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800 relative"
              >
                
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-lg">
                    <FaIdBadge size={20} />
                    <strong>ID:</strong> {project.projectId}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaProjectDiagram size={20} />
                    <strong>Client:</strong> {project.clientName}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaBuilding size={20} />
                    <strong>Title:</strong> {project.title}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaFileAlt size={20} />
                    <strong>Due Date:</strong> {format(new Date(project.dueDate), "dd-MM-yyyy")}
                  </p>
                </div>
                <div className="flex gap-6 justify-end mt-4">
                  <button
                    onClick={() => handleEdit(project)}
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(project._id)}
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
        <p className="text-center text-gray-400">No project details found.</p>
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
              Are you sure you want to delete this project?
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
    </div>
  );
};

export default ShowProjectPage;
