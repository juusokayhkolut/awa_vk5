import { Request, Response } from "express";
import User from "../models/User";

export const addTodo = async (req: Request, res: Response) => {
    try {
      const { name, todo } = req.body;
  
      let user = await User.findOne({ name });
      if (!user) {
        user = new User({ name, todos: [{ todo, checked: false }] });
      } else {
        user.todos.push({ todo, checked: false });
      }
  
      await user.save();
      res.status(201).json({ message: "Todo added successfully!" });
    } catch (error) {
      res.status(500).json({ error: "Error" });
    }
  };
  

export const getTodos = async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).json({ message: "User not found!" });
      return;
    }

    res.status(200).json(user.todos);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
};

export const deleteTodo = async (req: Request, res: Response) => {
  try {
    const { name, todoId } = req.body;

    if (!name || !todoId) {
      res.status(400).json({ message: "Missing 'name' or 'todoId'"});
    }

    const user = await User.findOne({ name });
    if (!user) {
      res.status(404).json({ message: "User not found" });
    }

    if (user != null) {
      const updatedTodos = user.todos.filter(
        (todo) => todo._id?.toString() !== todoId
      );
  
      if (updatedTodos.length === user.todos.length) {
        res.status(404).json({ message: "Todo not found" });
      }
  
      user.todos = updatedTodos;
      user.markModified("todos");
      await user.save();
  
      res.status(200).json({ message: "Todo deleted successfully", data: user });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateTodo = async (req: Request, res: Response) => {
  try {
    const { name, todoId, checked } = req.body;

    if (!name || !todoId || typeof checked !== "boolean") {
      res.status(400).json({ message: "Invalid input data" });
    }

    const user = await User.findOneAndUpdate(
      { name, "todos._id": todoId },
      { $set: { "todos.$.checked": checked } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "User or Todo not found" });
    }

    res.status(200).json({ message: "Todo updated successfully", data: user });
  } catch (error) {
    console.error("Error updating todo status:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};