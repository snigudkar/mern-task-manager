import Task from "../models/taskModel.js";

export const getTasks = async (req, res) => {
  const tasks = await Task.find().populate("assignedTo", "name email");
  res.json(tasks);
};

export const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.json(task);
};

export const deleteTask = async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: "Task deleted" });
};
