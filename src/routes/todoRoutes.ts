import express from "express";
import { addTodo, getTodos, deleteTodo, updateTodo } from "../controllers/todoController";

const router = express.Router();

router.post("/add", addTodo);
router.get("/todos", getTodos);
router.put("/update", updateTodo);
router.delete("/delete", deleteTodo);

export default router;
