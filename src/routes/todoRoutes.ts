import express from "express";
import { addTodo, getTodos, deleteTodo, updateTodo, toggleTodoChecked } from "../controllers/todoController";

const router = express.Router();

router.post("/add", addTodo);
router.get("/todos", getTodos);
router.put("/update", updateTodo);
router.put("/toggle-checked", toggleTodoChecked);
router.delete("/delete", deleteTodo);

export default router;
