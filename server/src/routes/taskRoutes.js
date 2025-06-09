import { Router } from "express";
import {
  addTask,
  deleteTask,
  editTask,
  getAllTasks,
  getTasksIndividualUser,
} from "../controllers/taskController.js";
import {
  taskEditValidationRules,
  taskInputValidationRules,
} from "../utils/validations.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = Router();

router.get("/get-all-tasks", verifyToken, getAllTasks);
router.get("/get-tasks", verifyToken, getTasksIndividualUser);
router.post("/add-task", taskInputValidationRules, verifyToken, addTask);
router.put("/edit-task/:id", taskEditValidationRules, verifyToken, editTask);
router.delete("/delete-task/:id", verifyToken, deleteTask);

export default router;
