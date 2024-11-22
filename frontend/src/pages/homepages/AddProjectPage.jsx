import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input_product from "../../components/homecomponents/Input_product";
import { FiCalendar, FiDollarSign, FiFileText, FiHash } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import Select from "react-select";

function AddProjectPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const existingProject = location.state?.project;

  const [projectData, setProjectData] = useState({
    projectId: existingProject?.projectId || "",
    clientId: existingProject?.clientId || "",
    clientName: existingProject?.clientName || "",
    title: existingProject?.title || "",
    pages: existingProject?.pages || "",
    description: existingProject?.description || "",
    status: existingProject?.status || "Pending",
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
    assignedMembers: existingProject?.assignedMembers || [],
  });

  const [allMembers, setAllMembers] = useState([]);
  const selectStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      // borderColor: "#10B981",
      color: "white",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#10B981",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "#1F2937",
      color: "white",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? "#10B981" : "#1F2937",
      color: state.isFocused ? "#FFFFFF" : "#D1D5DB",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    multiValue: (provided) => ({
      ...provided,
      backgroundColor: "#10B981",
      color: "#FFFFFF",
    }),
    multiValueLabel: (provided) => ({
      ...provided,
      color: "#FFFFFF",
    }),
    multiValueRemove: (provided) => ({
      ...provided,
      color: "#FFFFFF",
      "&:hover": {
        backgroundColor: "#065F46",
        color: "#FFFFFF",
      },
    }),
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/home/getmember", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        const result = await response.json();
        if (result.success && Array.isArray(result.data)) {
          setAllMembers(result.data);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        console.error("Error fetching members:", error.message);
      }
    };

    fetchData();
  }, []);

  const handleChange = (field, value) => {
    setProjectData((prevData) => ({ ...prevData, [field]: value }));
  };

  const handleAssignedMembersChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setProjectData((prevData) => ({ ...prevData, assignedMembers: selectedIds }));
  };

  const handleSubmit = async () => {
    const url = existingProject
      ? `http://localhost:8080/api/home/editproject/${existingProject._id}`
      : `http://localhost:8080/api/home/project`;
    const method = existingProject ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(projectData),
      });

      if (response.ok) {
        navigate("/projects");
      } else {
        console.error("Failed to save project data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const memberOptions = allMembers.map((member) => ({
    value: member._id,
    label: `${member.name} - ${member.designation}`,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
            {existingProject ? "Edit Project" : "New Project"}
          </h2>
          <form className="space-y-4">
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
              label="Number of Pages"
              placeholder="200"
              value={projectData.pages}
              onChange={(e) => handleChange("pages", e.target.value)}
            />

            <Input_product
              label="Description"
              type="textarea"
              placeholder="Add a brief description of the project..."
              value={projectData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
            <Input_product
              label="Received Date"
              type="date"
              icon={<FiCalendar />}
              value={projectData.receivedDate}
              onChange={(e) => handleChange("receivedDate", e.target.value)}
            />
            <Input_product
              label="Due Date"
              type="date"
              icon={<FiCalendar />}
              value={projectData.dueDate}
              onChange={(e) => handleChange("dueDate", e.target.value)}
            />
    
            {/* Dropdowns */}
            <label className="block text-white font-medium">Status</label>
            <Select
              options={[
                { value: "Pending", label: "Pending" },
                { value: "In Progress", label: "In Progress" },
                { value: "Completed", label: "Completed" },
                { value: "Cancelled", label: "Cancelled" },
              ]}
              styles={selectStyles}
              value={{ value: projectData.status, label: projectData.status }}
              onChange={(selectedOption) => handleChange("status", selectedOption.value)}
            />

            <label className="block text-white font-medium">Input Type</label>
            <Select
              options={[
                { value: "Physical", label: "Physical" },
                { value: "Digital", label: "Digital" },
              ]}
              styles={selectStyles}
              value={{ value: projectData.inputType, label: projectData.inputType }}
              onChange={(selectedOption) => handleChange("inputType", selectedOption.value)}
            />

            <label className="block text-white font-medium">Complexity</label>
            <Select
              options={[
                { value: "Easy", label: "Easy" },
                { value: "Medium", label: "Medium" },
                { value: "Hard", label: "Hard" },
              ]}
              styles={selectStyles}
              value={{ value: projectData.complexity, label: projectData.complexity }}
              onChange={(selectedOption) => handleChange("complexity", selectedOption.value)}
            />

            <label className="block text-white font-medium">Assign Members</label>
            <Select
              isMulti
              options={memberOptions}
              styles={selectStyles}
              value={memberOptions.filter((option) =>
                projectData.assignedMembers.includes(option.value)
              )}
              onChange={handleAssignedMembersChange}
              placeholder="Assign team members..."
            />

            {/* Costs */}
            <Input_product
              label="Client Cost"
              placeholder="e.g., 5000"
              icon={<FiDollarSign />}
              value={projectData.clientCost}
              onChange={(e) => handleChange("clientCost", e.target.value)}
            />
            <Input_product
              label="Outsource Cost"
              placeholder="e.g., 2000"
              icon={<FiDollarSign />}
              value={projectData.outsourceCost}
              onChange={(e) => handleChange("outsourceCost", e.target.value)}
            />
            <Input_product
              label="Production Cost"
              placeholder="e.g., 3000"
              icon={<FiDollarSign />}
              value={projectData.productionCost}
              onChange={(e) => handleChange("productionCost", e.target.value)}
            />

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded"
              >
                {existingProject ? "Save Changes" : "Add Project"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectPage;
