import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import {
  FaIdBadge,
  FaProjectDiagram,
  FaBuilding,
  FaFileAlt,
  FaEdit,
  FaTrashAlt,
  FaBook,
  FaClock,
} from "react-icons/fa"; // Icons for project fields
import { BiSolidCommentDetail } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

const ShowProjectPage = () => {
  const navigate = useNavigate();
  const [projectData, setProjectData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedProject, setExpandedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

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
  const handleDelete = async (projectId) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/home/deleteproject/${projectId}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      setProjectData(projectData.filter((project) => project._id !== projectId));
      alert("Project deleted successfully");
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  // Handle Edit
  const handleEdit = (project) => {
    navigate("/add-project", { state: { project } });
  };

  const handleCardClick = (projectId) => {
    setExpandedProject((prev) => (prev === projectId ? null : projectId));
  };

  const paginatedProjects = projectData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center text-emerald-500">Project Details</h1>
      {projectData.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {paginatedProjects.map((project) => (
              <div
                key={project._id}
                className="p-6 border-2 border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800 relative"
                onClick={() => handleCardClick(project._id)} // Card click handler
              >
                {/* Title and Client Name */}
                <p className="text-lg font-bold">{project.projectId} - {project.title}</p>
                <p className="text-md">{project.clientName}</p>

                {/* Show details when the card is expanded */}
                {expandedProject === project._id && (
                  <div className="space-y-4 mt-4">
                    <div className="flex items-center gap-3 text-lg">
                      <FaBuilding size={20} />
                      <strong>Title:</strong> {project.title}
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                      <BiSolidCommentDetail size={20} />
                      <strong>Description:</strong> {project.description}
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                      <FaBook size={20} />
                      <strong>Pages & Complexity:</strong> {project.pages} pages & {project.complexity}
                    </div>
                    <div className="flex items-center gap-3 text-lg">
                      <FaClock size={20} />
                      <strong>Received & Due Date:</strong> {format(new Date(project.receivedDate), "dd-MM-yyyy")}  To {format(new Date(project.dueDate), "dd-MM-yyyy")}   
                    </div>

                    {/* Edit/Delete Buttons */}
                    <div className="flex gap-6 justify-end mt-4">
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleEdit(project);
                        }}
                        className="bg-emerald-500 text-white px-6 py-2 rounded hover:bg-emerald-600 transition-all duration-300"
                      >
                        <FaEdit size={24} className="inline mr-2" />
                        Edit
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation(); // Prevent card click
                          handleDelete(project._id);
                        }}
                        className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-all duration-300"
                      >
                        <FaTrashAlt size={24} className="inline mr-2" />
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-400">No project details found.</p>
      )}

      {/* Pagination */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(projectData.length / itemsPerPage) }).map((_, i) => (
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
        ))}
      </div>
    </div>
  );
};

export default ShowProjectPage;
