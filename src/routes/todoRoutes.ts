import express from "express";
import { addTodo, getTodos, deleteTodo, updateTodo } from "../controllers/todoController";

const router = express.Router();

router.post("/add", addTodo);
router.get("/todos", getTodos);
router.put("/update", deleteTodo);
router.put("/updateTodo", updateTodo);

export default router;
