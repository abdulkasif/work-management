import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FaEnvelope, FaPhone, FaUser, FaIdCard, FaChevronDown, FaChevronUp } from "react-icons/fa"; // Icons
import { useNavigate } from "react-router-dom";

function FetchMemberDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  const memberId = user?.memberId;
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState(null);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {

    const fetchData = async () => {
      try{
        const response = await fetch(
          `http://localhost:8080/api/home/getmemberbyid/${memberId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const result = await response.json();
  
        if (result.success) {
          setMemberData(result.data);
          const projectIds = result.data.assignedProject;
          const projectDataPromises = projectIds.map((projectId) =>
            fetch(
              `http://localhost:8080/api/home/getprojectbyid/${projectId}`
            ).then((res) => res.json())
          );
          const projectData = await Promise.all(projectDataPromises);
          setAssignedProjects(projectData.map((response) => response.data));
        }
  
        setLoading(false);

      }catch(error){
        console.error(error);
        
      }
      

     
    };

    fetchData();
  }, [memberId]);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProjects = assignedProjects.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(assignedProjects.length / itemsPerPage);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-center text-emerald-500 mb-6">
          Member Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-2">
            <FaIdCard className="text-green-500" />
            <span className="font-semibold">ID:</span>
            <span>{memberData?.id}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-green-500" />
            <span className="font-semibold">Name:</span>
            <span>{memberData?.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaUser className="text-green-500" />
            <span className="font-semibold">Designation:</span>
            <span>{user?.designation}</span>
          </div>
          <div className="flex items-center gap-2">
            <FaPhone className="text-green-500" />
            <span className="font-semibold">Mobile No. :</span>
            <span>{memberData?.mobileNo}</span>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4">
          <FaEnvelope className="text-green-500" />
          <span className="font-semibold">Email:</span>
          <span>{user?.email}</span>
        </div>
      </div>

      <div className="mt-8">
        <div className="max-w-4xl mx-auto px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center text-emerald-500 mb-6">
            Assigned Projects
          </h2>
          {paginatedProjects.map((project, index) => (
            <div
              key={index}
              className="p-4 mb-4 bg-gray-700 rounded-lg shadow-md"
            >
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleExpand(index)}
              >
                <h3 className="text-lg font-semibold">
                  {project.projectId} - {project.title}
                </h3>
                {expanded[index] ? (
                  <FaChevronUp className="text-green-500" />
                ) : (
                  <FaChevronDown className="text-green-500" />
                )}
              </div>
              {expanded[index] && (
                <div className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <span className="font-medium">Status:</span> {project.status}
                    </div>
                    <div>
                      <span className="font-medium">Client Name:</span>{" "}
                      {project.clientName}
                    </div>
                    <div>
                      <span className="font-medium">Pages:</span> {project.pages}
                    </div>
                    <div>
                      <span className="font-medium">Deadline:</span>{" "}
                      {format(new Date(project.dueDate), "dd-MM-yyyy")}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-medium">Description:</span>
                    <p>{project.description}</p>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="flex justify-between mt-4">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === i + 1
                    ? "bg-green-500 text-white"
                    : "bg-gray-600 text-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FetchMemberDetails;
