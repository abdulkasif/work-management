import React, { useEffect, useState } from "react";
import { FaUser, FaEnvelope, FaIdBadge, FaEdit, FaTrashAlt, FaBriefcase } from "react-icons/fa";
import Header from "../../components/Header";

const ShowMemberPage = () => {
  const [memberData, setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteConfirmVisible, setDeleteConfirmVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedMemberId, setSelectedMemberId] = useState(null);
  const [deleteInput, setDeleteInput] = useState('');
  const [editMember, setEditMember] = useState({
    name: '',
    email: '',
    designation: '',
  });

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

  const handleEdit = (member) => {
    setSelectedMemberId(member._id);
    setEditMember({
      name: member.name,
      email: member.email,
      designation: member.designation,
    });
    setEditModalVisible(true); // Show Edit modal
  };

  const handleDelete = (id) => {
    setSelectedMemberId(id);
    setDeleteConfirmVisible(true); // Show delete confirmation modal
  };

  const confirmDelete = async () => {
    if (deleteInput === "Delete") {
      try {
        const response = await fetch(`http://localhost:8080/api/home/deletemember/${selectedMemberId}`, {
          method: "DELETE",
        });
        if (!response.ok) throw new Error(`Error: ${response.statusText}`);

        setMemberData(memberData.filter((member) => member._id !== selectedMemberId));
        alert("Member deleted successfully");
      } catch (error) {
        console.error("Failed to delete member:", error);
      } finally {
        setDeleteConfirmVisible(false); // Close the modal
        setDeleteInput(''); // Reset the input field
      }
    } else {
      alert("Please type 'Delete' to confirm.");
    }
  };

  const cancelDelete = () => {
    setDeleteConfirmVisible(false); // Close the modal
    setDeleteInput(''); // Reset the input field
  };

  const handleSaveEdit = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/home/updatemember/${selectedMemberId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editMember),
      });

      if (!response.ok) throw new Error(`Error: ${response.statusText}`);

      const updatedMember = await response.json();
      setMemberData(
        memberData.map((member) =>
          member._id === selectedMemberId ? updatedMember : member
        )
      );
      alert("Member updated successfully");
      setEditModalVisible(false); // Close the Edit modal
    } catch (error) {
      console.error("Failed to update member:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditModalVisible(false); // Close the Edit modal
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="text-white bg-gray-900 min-h-screen">
      <Header />
      <h1 className="text-3xl font-bold mb-6 text-center">Member Details</h1>
      {memberData.length > 0 ? (
        <div className="flex justify-center">
          <div className="w-full max-w-4xl space-y-6">
            {memberData.map((member) => (
              <div
                key={member._id}
                className="p-6 border-2 border-gray-600 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-800"
              >
                <div className="space-y-4">
                  <p className="flex items-center gap-3 text-lg">
                    <FaIdBadge className="text-gray-400" size={20} />
                    <strong>ID:</strong> {member.id}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaUser className="text-gray-400" size={20} />
                    <strong>Name:</strong> {member.name}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaEnvelope className="text-gray-400" size={20} />
                    <strong>Email:</strong> {member.email}
                  </p>
                  <p className="flex items-center gap-3 text-lg">
                    <FaBriefcase className="text-gray-400" size={20} />
                    <strong>Designation:</strong> {member.designation}
                  </p>
                </div>
                <div className="flex gap-6 justify-end mt-4">
                  <button
                    onClick={() => handleEdit(member)}
                    className="text-blue-500 hover:text-blue-700 transition-all duration-200"
                  >
                    <FaEdit size={24} />
                  </button>
                  <button
                    onClick={() => handleDelete(member._id)}
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
        <p className="text-center text-gray-400">No member details found.</p>
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
              Are you sure you want to delete this member?
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

      {/* Edit Modal */}
      {editModalVisible && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
          <div className="bg-gray-800 p-6 rounded-lg w-96">
            <div className="flex justify-end">
              <button
                onClick={handleCancelEdit}
                className="text-white text-xl font-bold"
              >
                X
              </button>
            </div>
            <h3 className="text-xl text-center mb-4 text-blue-500">
              Edit Member Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white">Name</label>
                <input
                  type="text"
                  value={editMember.name}
                  onChange={(e) => setEditMember({ ...editMember, name: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white">Email</label>
                <input
                  type="email"
                  value={editMember.email}
                  onChange={(e) => setEditMember({ ...editMember, email: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm text-white">Designation</label>
                <input
                  type="text"
                  value={editMember.designation}
                  onChange={(e) => setEditMember({ ...editMember, designation: e.target.value })}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                />
              </div>
            </div>
            <div className="flex justify-between mt-4">
              <button
                onClick={handleCancelEdit}
                className="bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEdit}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowMemberPage;
