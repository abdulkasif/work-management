import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Input_product from "../../components/homecomponents/Input_product";
import { FiCalendar, FiDollarSign, FiFileText, FiHash } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import { format } from "date-fns";
import ConfirmationModals from "../../components/ConfirmationModals";
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
    description: existingProject?.description || "",
    status: existingProject?.status || "Pending",
    assignedMembers: existingProject?.assignedMembers || [],
  });

  const [allMembers, setAllMembers] = useState([]);
  const [changedFields, setChangedFields] = useState({});
  const [showChangesModal, setShowChangesModal] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "http://localhost:8080/api/home/getmember",
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          }
        );

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
    setProjectData((prevData) => {
      const updatedData = { ...prevData, [field]: value };

      if (existingProject && existingProject[field] !== value) {
        setChangedFields((prevFields) => ({
          ...prevFields,
          [field]: { old: existingProject[field] || "N/A", new: value },
        }));
      } else {
        setChangedFields((prevFields) => {
          const updatedFields = { ...prevFields };
          delete updatedFields[field];
          return updatedFields;
        });
      }

      return updatedData;
    });
  };

  const handleAssignedMembersChange = (selectedOptions) => {
    const selectedIds = selectedOptions.map((option) => option.value);
    setProjectData((prevData) => ({
      ...prevData,
      assignedMembers: selectedIds,
    }));
    handleChange("assignedMembers", selectedIds);
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
    label: member.name + " - " + member.designation,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-gray-900">
      <Header />
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="max-w-lg w-full bg-gray-800 bg-opacity-50 p-8 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl">
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
            <label className="block text-white font-medium mb-2">
              Assign Members
            </label>
            <Select
              isMulti
              options={memberOptions}
              value={memberOptions.filter((option) =>
                projectData.assignedMembers.includes(option.value)
              )}
              onChange={handleAssignedMembersChange}
              placeholder="Search and select members"
              className="react-select-container"
              classNamePrefix="react-select"
            />
            <Input_product
              label="Received Date"
              placeholder="MM/DD/YYYY"
              icon={<FiCalendar />}
              type="date"
              value={projectData.receivedDate}
              onChange={(e) => handleChange("receivedDate", e.target.value)}
            />
            <Input_product
              label="Client Cost"
              placeholder="$500"
              icon={<FiDollarSign />}
              type="number"
              value={projectData.clientCost}
              onChange={(e) => handleChange("clientCost", e.target.value)}
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
                type="button"
                onClick={() => setShowChangesModal(true)}
                className="flex-1 ml-2 py-3 bg-green-600 text-white rounded-lg font-bold hover:bg-green-500 transition duration-200"
              >
                Edit Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Modal */}
      {showChangesModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <h3 className="text-xl text-center mb-4 text-green-500">
              Review Changes
            </h3>
            <ul className="text-white mb-4">
              {Object.entries(changedFields).length > 0 ? (
                Object.entries(changedFields).map(
                  ([field, { old, new: newValue }]) => (
                    <li key={field} className="mb-2">
                      <strong>{field}:</strong> {old} → {newValue}
                    </li>
                  )
                )
              ) : (
                <p className="text-white">No changes made.</p>
              )}
            </ul>
            <div className="flex justify-between">
              <button
                onClick={() => setShowChangesModal(false)}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="bg-green-600 text-white px-4 py-2 rounded"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddProjectPage;
