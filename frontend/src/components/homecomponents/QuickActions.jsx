import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { UserContext } from "../../context/UserContext.jsx"; // Import your UserContext

const QuickActions = () => {
  const navigate = useNavigate();
  const { userInfo } = useContext(UserContext); // Get user info from context

  // Action handler for routing
  const handleClick = (action) => {
    if (action === "Add Client") {
      navigate("/add-client");
    }
    if (action === "New Project") {
      navigate("/add-project");
    }
    if (action === "Add Member") {
      navigate("/add-member");
    }
  };

  // Define actions and corresponding roles allowed to access them
  const actions = [
    {
      action: "Add Client",
      allowedRoles: ["Manager"], // Only manager can add client
    },
    {
      action: "New Project",
      allowedRoles: ["Team Lead", "Manager"], // Team leads and managers can add projects
    },
    {
      action: "Add Member",
      allowedRoles: ["Team Lead" , "Manager"], // Team leads and managers can add members
    },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {actions.map(({ action, allowedRoles }) =>
        allowedRoles.includes(userInfo?.designation) ? ( // Check if the user's designation allows this action
          <div
            className="flex flex-1 flex-col items-start justify-between gap-4 rounded-xl border border-[#3d4a52] bg-[#17272f] p-5"
            key={action}
          >
            <div className="flex flex-col gap-1">
              <p className="text-white text-base font-bold leading-tight">{action}</p>
              <p className="text-[#9eadb7] text-base font-normal leading-normal">
                {`Invite a new ${action.split(" ")[1].toLowerCase()} to your workspace`}
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05, backgroundColor: "#1d8cd7" }} // Animation on hover
              whileTap={{ scale: 0.95 }} // Animation on tap
              onClick={() => handleClick(action)}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
            >
              <span className="truncate">Create New</span>
            </motion.button>
          </div>
        ) : null // If the user's role doesn't match, skip rendering
      )}
    </div>
  );
};

export default QuickActions;
