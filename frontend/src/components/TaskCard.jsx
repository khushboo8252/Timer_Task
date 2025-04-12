import React from "react";

const TaskCard = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow p-5 mb-4 border border-gray-100">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{task.title}</h3>
          <p className="text-gray-600">{task.description}</p>
          <p className="text-sm text-gray-500 mt-2">
            ⏱ Duration: <span className="font-medium">{task.duration} mins</span>
          </p>
        </div>
      </div>

      <div className="flex gap-3 mt-4">
        <button
          onClick={() => onUpdate(task)}
          className="bg-yellow-400 hover:bg-yellow-500 text-white font-medium px-4 py-2 rounded-xl transition"
        >
          ✏️ Update
        </button>
        <button
          onClick={() => onDelete(task._id)}
          className="bg-red-500 hover:bg-red-600 text-white font-medium px-4 py-2 rounded-xl transition"
        >
          🗑️ Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
