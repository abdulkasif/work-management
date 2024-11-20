import React, { useEffect, useState } from "react";

import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

function FetchMemberDetails() {
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user)
  const memberId = user?.memberId;
  const navigate = useNavigate();

  const [memberData, setMemberData] = useState(null);
  const [assignedProjects, setAssignedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      // Fetch member data
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
        // Fetch project details based on assigned project IDs
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
    };

    fetchData();
  }, [memberId]);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users/logout", {
        method: "POST",
        credentials: "include", // This ensures cookies are sent with the request
      });

      if (response.status === 200) {
        // Clear local storage
        localStorage.clear();

        // Navigate to login page
        navigate("/");
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("An error occurred during logout:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <div className="bg-gray-900 min-h-screen text-white relative">
        {/* Logout Button */}
        { memberData.designation === "Member" ?
        <button
          onClick={handleLogout}
          className="absolute top-6 right-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-red-700 focus:outline-none transition"
        >
          Logout
        </button> : null }

        {/* Member Info Section */}
        <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Member Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-between">
              <span className="font-semibold">ID:</span>
              <span>{memberData?.id}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Name:</span>
              <span>{memberData?.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Email:</span>
              <span>{user?.email}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Designation:</span>
              <span>{user?.designation}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold">Mobile No. :</span>
              <span>{memberData?.mobileNo}</span>
            </div>
          </div>
        </div>

        {/* Assigned Projects Section */}
        <div className="max-w-4xl mx-auto mt-10 px-6 py-8 bg-gray-800 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6">
            Assigned Projects
          </h2>
          <div className="space-y-6">
            {assignedProjects.map((project, index) => (
              <div
                key={index}
                className="p-6 bg-gray-700 rounded-lg shadow-md hover:bg-gray-600 transition duration-200"
              >
                <h3 className="text-xl font-semibold mb-3">
                  {project.projectId} - {project.title}
                </h3>

                {/* Flex layout for project info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex justify-between">
                    <span className="font-medium">Status:</span>
                    <span>{project.status}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Deadline:</span>
                    <span>
                      {format(new Date(project.dueDate), "dd-MM-yyyy")}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Client Name:</span>
                    <span>{project.clientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Pages:</span>
                    <span>{project.pages}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-1 lg:col-span-2">
                    <span className="font-medium">Description:</span>
                    <p>{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default FetchMemberDetails;
