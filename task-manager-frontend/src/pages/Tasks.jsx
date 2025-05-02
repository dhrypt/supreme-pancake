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
