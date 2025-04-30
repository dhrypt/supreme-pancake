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
  const { status } = req.query;

  const filter = { userId: req.user };
  if (status === "complete" || status === "incomplete") {
    filter.status = status;
  }

  try {
    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to fetch tasks", error: err.message });
  }
};

// Update a task
export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status, priority } = req.body;

  try {
    const task = await Task.findOneAndUpdate(
      { _id: id, userId: req.user },
      { title, description, status, priority },
      { new: true }
    );

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json(task);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to update task", error: err.message });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findOneAndDelete({ _id: id, userId: req.user });

    if (!task) return res.status(404).json({ message: "Task not found" });

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to delete task", error: err.message });
  }
};
