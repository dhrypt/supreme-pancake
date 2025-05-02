import { useEffect, useState } from "react";
import { getWithAuth, logout } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const data = await getWithAuth("/api/tasks");
        setTasks(data);
      } catch (err) {
        setError(err.message);
        logout();
        navigate("/login");
      }
    };

    fetchTasks();
  }, [navigate]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Tasks</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;

          try {
            const res = await fetch(
              `${import.meta.env.VITE_API_URL}/api/tasks`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ title, description }),
              }
            );

            if (!res.ok) throw new Error("Failed to create task");
            const newTask = await res.json();
            setTasks((prev) => [...prev, newTask]);
            e.target.reset();
          } catch (err) {
            setError(err.message);
          }
        }}
        className="space-y-3 mb-6"
      >
        <input
          name="title"
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white p-2 rounded"
        >
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {tasks.map((task) => (
          <li key={task._id} className="p-3 border rounded">
            <p className="font-medium">{task.title}</p>
            <p className="text-sm text-gray-600">{task.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
