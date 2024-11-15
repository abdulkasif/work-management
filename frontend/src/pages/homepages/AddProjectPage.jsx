import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input_product from "../../components/homecomponents/Input_product";
import { FiCalendar, FiDollarSign, FiFileText, FiHash } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import {format} from "date-fns";

function AddProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingProject = location.state?.project;

  // State for form fields, pre-filled if editing
  const [projectData, setProjectData] = useState({
    projectId: existingProject?.projectId || "",
    clientId: existingProject?.clientId || "",
    clientName: existingProject?.clientName || "",
    title: existingProject?.title || "",
    pages: existingProject?.pages || "",
    inputType: existingProject?.inputType || "Physical",
    complexity: existingProject?.complexity || "Easy",
    receivedDate: existingProject?.receivedDate
    ? format(new Date(existingProject.receivedDate), "yyyy-MM-dd")
    : "",
  dueDate: existingProject?.dueDate
    ? format(new Date(existingProject.dueDate), "yyyy-MM-dd")
    : "",
    clientCost: existingProject?.clientCost || "",
    outsourceCost: existingProject?.outsourceCost || "",
    productionCost: existingProject?.productionCost || "",
  });

  // Handle input change
  const handleChange = (field, value) => {
    setProjectData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = existingProject
      ? `http://localhost:8080/api/home/editproject/${existingProject._id}`
      : `http://localhost:8080/api/home/project`;
    const method = existingProject ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        alert(
          existingProject
            ? "Project updated successfully!"
            : "Project added successfully!"
        );
        navigate('/projects'); // Navigate back to the projects page
      } else {
        console.error("Failed to save project data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            {existingProject ? "Edit Project" : "New Project"}
          </h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input_product
              label="Project ID"
              placeholder="12345"
              icon={<FiHash />}
              value={projectData.projectId}
              onChange={(e) => handleChange("projectId", e.target.value)}
            />
            <Input_product
              label="Client ID"
              placeholder="AB123"
              value={projectData.clientId}
              onChange={(e) => handleChange("clientId", e.target.value)}
            />
            <Input_product
              label="Client Name"
              placeholder="Amco Co."
              value={projectData.clientName}
              onChange={(e) => handleChange("clientName", e.target.value)}
            />
            <Input_product
              label="Title/ISBN"
              placeholder="The Hobbit"
              icon={<FiFileText />}
              value={projectData.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
            <Input_product
              label="Pages"
              placeholder="100"
              type="number"
              value={projectData.pages}
              onChange={(e) => handleChange("pages", e.target.value)}
            />
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">Input Type</p>
              <select
                className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
                value={projectData.inputType}
                onChange={(e) => handleChange("inputType", e.target.value)}
              >
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
            </label>
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">Complexity</p>
              <select
                className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
                value={projectData.complexity}
                onChange={(e) => handleChange("complexity", e.target.value)}
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </label>
            <Input_product
              label="Received Date"
              placeholder="MM/DD/YYYY"
              icon={<FiCalendar />}
              type="date"
              value={projectData.receivedDate}
              onChange={(e) => handleChange("receivedDate", e.target.value)}
            />
            <Input_product
              label="Due Date"
              placeholder="MM/DD/YYYY"
              icon={<FiCalendar />}
              type="date"
              value={projectData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
            <Input_product
              label="Client Cost"
              placeholder="$500"
              icon={<FiDollarSign />}
              type="number"
              value={projectData.clientCost}
              onChange={(e) => handleChange("clientCost", e.target.value)}
            />
            <Input_product
              label="Outsource Cost"
              placeholder="$500"
              icon={<FiDollarSign />}
              type="number"
              value={projectData.outsourceCost}
              onChange={(e) => handleChange("outsourceCost", e.target.value)}
            />
            <Input_product
              label="Production Cost"
              placeholder="$500"
              icon={<FiDollarSign />}
              type="number"
              value={projectData.productionCost}
              onChange={(e) => handleChange("productionCost", e.target.value)}
            />
            <div className="flex justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/projects")}
                className="flex-1 mr-2 py-3 bg-gray-700 text-white rounded-lg font-bold hover:bg-gray-600 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 ml-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200"
              >
                {existingProject ? "Edit Project" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectPage;
