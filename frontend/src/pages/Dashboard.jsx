import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import TaskCard from "../components/TaskCard";

const Dashboard = () => {
  const { tasks = [], createTask, updateTask, deleteTask } = useContext(TaskContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");

    createTask({ title, description, duration: Number(duration) || 0 });

    setTitle("");
    setDescription("");
    setDuration("");
  };

  const handleUpdate = (task) => {
    const newTitle = prompt("Update Title", task.title);
    const newDescription = prompt("Update Description", task.description);
    const newDuration = prompt("Update Duration (in mins)", task.duration);

    if (newTitle && newDescription && newDuration !== null) {
      updateTask(task._id, {
        ...task,
        title: newTitle,
        description: newDescription,
        duration: Number(newDuration),
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 p-4">
      <form onSubmit={handleCreate} className="mb-6 space-y-2 bg-white p-4 rounded-xl shadow">
        <h2 className="text-xl font-bold mb-2">Add New Task</h2>
        <input
          className="w-full border p-2 rounded"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-full border p-2 rounded"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="number"
          min="0"
          className="w-full border p-2 rounded"
          placeholder="Duration (minutes)"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <button
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded w-full"
          type="submit"
        >
          ➕ Add Task
        </button>
      </form>

      {Array.isArray(tasks) && tasks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {tasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onDelete={deleteTask}
              onUpdate={handleUpdate}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No tasks yet!</p>
      )}
    </div>
  );
};

export default Dashboard;
