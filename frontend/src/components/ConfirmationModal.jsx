// ConfirmationModal.js
import React from "react";

const ConfirmationModal = ({ changedFields, onConfirm, onCancel }) => {
  const safeChangedFields = changedFields && typeof changedFields === "object" ? changedFields : {};

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h3 className="text-2xl font-bold text-center text-white mb-4">Confirm Changes</h3>
        <div className="text-white mb-4">
          <h4 className="font-bold text-green-400 mb-2">Changes:</h4>
          <ul>
            {Object.entries(safeChangedFields).map(([key, value]) => (
              <li key={key}>
                <span className="font-bold">{key}:</span> {value}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-500"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-500"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
