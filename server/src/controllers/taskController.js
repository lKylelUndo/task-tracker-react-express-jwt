import { matchedData, validationResult } from "express-validator";
import Task from "../models/Task.js";

export const getTasksIndividualUser = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log("Inside " + userId);
    const tasks = await Task.findAll({ where: { userId } });

    return res.status(200).json({ tasks });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();

    return res.status(200).json({ tasks });
  } catch (error) {
    return res.status(401).json({ error });
  }
};

export const addTask = async (req, res) => {
  try {
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(401).send({ errors: result.array() });
    }

    const data = matchedData(req);
    console.log(data);
    data.userId = req.user.id;

    const response = await Task.create(data);

    return res.status(200).json({ message: "Success", response });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error });
  }
};

export const editTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    const data = matchedData(req);
    data.userId = req.user.id;
    await task.update(data);

    return res.status(200).json({ message: "Task updated", task });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const taskId = req.params.id;
    const userId = req.user.id;

    const task = await Task.findOne({ where: { id: taskId, userId } });

    if (!task) {
      return res
        .status(404)
        .json({ message: "Task not found or not authorized" });
    }

    await task.destroy();

    return res.status(200).json({ message: "Task deleted" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
};
