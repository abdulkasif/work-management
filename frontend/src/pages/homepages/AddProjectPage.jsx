import React, { useState } from "react";
import Header from "../../components/Header";
import Input_product from "../../components/homecomponents/Input_product";
import { FiCalendar, FiDollarSign, FiFileText, FiHash } from "react-icons/fi";

function AddProjectPage() {
  // State variables for each form field
  const [projectId, setProjectId] = useState("");
  const [client, setClient] = useState("");
  const [title, setTitle] = useState("");
  const [pages, setPages] = useState("");
  const [inputType, setInputType] = useState("Physical");
  const [dueDate, setDueDate] = useState("");
  const [cost, setCost] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      projectId,
      client,
      title,
      pages,
      inputType,
      dueDate,
      cost
    };

    try {
      const response = await fetch("http://localhost:8080/api/home/project", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(projectData)
      });

      if (response.ok) {
        alert("Project added successfully!");
        // Optionally reset form or redirect
      } else {
        console.error("Failed to add project");
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
          <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">New Project</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input_product label="Project ID" placeholder="12345" icon={<FiHash />} value={projectId} onChange={(e) => setProjectId(e.target.value)} />
            <Input_product label="Client" placeholder="Acme Co." value={client} onChange={(e) => setClient(e.target.value)} />
            <Input_product label="Title/ISBN" placeholder="The Hobbit" icon={<FiFileText />} value={title} onChange={(e) => setTitle(e.target.value)} />
            <Input_product label="Pages" placeholder="100" type="number" value={pages} onChange={(e) => setPages(e.target.value)} />
            
            <label className="flex flex-col mb-4">
              <p className="text-white text-base font-medium pb-2">Input Type</p>
              <select
                className="form-input w-full h-12 rounded-lg text-white border border-gray-700 bg-gray-800 focus:border-green-500 focus:ring-2 focus:ring-green-500 placeholder-gray-400 px-4"
                value={inputType}
                onChange={(e) => setInputType(e.target.value)}
              >
                <option value="Physical">Physical</option>
                <option value="Digital">Digital</option>
              </select>
            </label>

            <Input_product label="Due Date" placeholder="MM/DD/YYYY" icon={<FiCalendar />} type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
            <Input_product label="Cost" placeholder="$500" icon={<FiDollarSign />} type="number" value={cost} onChange={(e) => setCost(e.target.value)} />

            <div className="flex justify-end mt-6">
              <button type="button" className="flex-1 h-12 bg-gray-700 text-white rounded-lg font-bold mr-2 transition duration-200 hover:bg-gray-600">
                Cancel
              </button>
              <button type="submit" className="flex-1 h-12 bg-green-600 text-white rounded-lg font-bold ml-2 transition duration-200 hover:bg-green-500">
                Add Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddProjectPage;
