import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  const { title, description, priority } = req.body;

  try {
    const task = new Task({
      title,
      description,
      priority,
      userId: req.user,
    });

    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to create task", error: err.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user });
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
};
