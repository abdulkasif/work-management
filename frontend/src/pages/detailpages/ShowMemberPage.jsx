import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaEnvelope,
  FaIdBadge,
  FaEdit,
  FaTrashAlt,
  FaBriefcase,
  FaPhone,
} from "react-icons/fa";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";

const ShowMemberPage = () => {
  const navigate = useNavigate();
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [selectedMemberEmail, setSelectedMemberEmail] = useState(null);
  const [deleteInput, setDeleteInput] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [openCardId, setOpenCardId] = useState(null);

  // State for sorting
  const [sortAscending, setSortAscending] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rjvn06q4-8080.inc1.devtunnels.ms/api/home/getmember",
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
          setMemberData(result.data);
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

  const confirmDelete = async () => {
    if (deleteInput === "Delete") {
      try {
        const response = await fetch(
          `
          https://rjvn06q4-8080.inc1.devtunnels.ms/api/home/deletemember/${selectedMemberId}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: selectedMemberEmail }),
          }
        );

        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        setMemberData(
          memberData.filter((member) => member._id !== selectedMemberId)
        );
        alert("Member deleted successfully");
      } catch (error) {
        console.error("Failed to delete member:", error);
      } finally {
        setDeleteConfirmVisible(false);
        setDeleteInput(""); // Reset the input field
      }
    } else {
      alert("Please type 'Delete' to confirm.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false);
    setDeleteInput(""); // Reset the input field
  };

  const paginatedMembers = memberData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-emerald-500">
          Member Details
        </h1>

        {memberData.length > 0 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-4xl space-y-6">
              {paginatedMembers.map((member) => (
                <div
                  key={member._id}
                  className="p-6 border-2 border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800"
                >
                  <div
                    className="flex justify-between items-center cursor-pointer hover:bg-gray-700 p-3 rounded-lg"
                    onClick={() =>
                      setOpenCardId((prevId) =>
                        prevId === member._id ? null : member._id
                      )
                    }
                  >
                    <h2 className="text-lg font-semibold text-gray-300">
                      {member.id} - {member.name} ({member.designation})
                    </h2>
                    <div className="flex gap-4">
                      <button
                        onClick={() =>
                          navigate("/add-member", { state: { member } })
                        }
                        className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                      >
                        <FaEdit size={20} />
                      </button>
                      <button
                        onClick={() =>
                          setDeleteConfirmVisible(true) ||
                          setSelectedMemberId(member._id)
                        }
                        className="text-red-500 hover:text-red-700 transition-all duration-200"
                      >
                        <FaTrashAlt size={20} />
                      </button>
                    </div>
                  </div>
                  {openCardId === member._id && (
                    <div className="space-y-4 mt-4">
                      <p className="flex items-center gap-3 text-lg text-gray-300">
                        <FaEnvelope className="text-emerald-500" size={20} />
                        <strong>Email:</strong> {member.email}
                      </p>
                      <p className="flex items-center gap-3 text-lg text-gray-300">
                        <FaPhone className="text-emerald-500" size={20} />
                        <strong>Phone:</strong> {member.mobileNo}
                      </p>
                      <p className="flex items-center gap-3 text-lg text-gray-300">
                        <FaBriefcase className="text-emerald-500" size={20} />
                        <strong>Salary:</strong> Rs.{member.salary} -{" "}
                        {member.salaryType}
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-400">No member details found.</p>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: Math.ceil(memberData.length / itemsPerPage) }).map((_, i) => (
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
          )
        )}
        </div>
        {/* Delete Confirmation Modal */}
        {deleteConfirmVisible && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-gray-800 p-6 rounded-lg w-96">
              <div className="flex justify-end">
                <button
                  onClick={cancelDelete}
                  className="text-gray-300 text-xl font-bold hover:text-red-500"
                >
                  ✕
                </button>
              </div>
              <h3 className="text-xl text-center mb-4 text-red-500">
                Are you sure you want to delete this member?
              </h3>
              <p className="text-center text-gray-300 mb-4">
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
                  className="bg-gray-600 text-gray-200 px-4 py-2 rounded hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  disabled={deleteInput !== "Delete"}
                  className={`px-4 py-2 rounded ${
                    deleteInput === "Delete"
                      ? "bg-red-600 text-white hover:bg-red-500"
                      : "bg-gray-600 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ShowMemberPage;
