"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTodo = exports.deleteTodo = exports.getTodos = exports.addTodo = void 0;
const User_1 = __importDefault(require("../models/User"));
const addTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, todo } = req.body;
        let user = yield User_1.default.findOne({ name });
        if (!user) {
            user = new User_1.default({ name, todos: [{ todo, checked: false }] });
        }
        else {
            user.todos.push({ todo, checked: false });
        }
        yield user.save();
        res.status(201).json({ message: "Todo added successfully!" });
    }
    catch (error) {
        res.status(500).json({ error: "Error" });
    }
});
exports.addTodo = addTodo;
const getTodos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.query;
        const user = yield User_1.default.findOne({ name });
        if (!user) {
            res.status(404).json({ message: "User not found!" });
            return;
        }
        res.status(200).json(user.todos);
    }
    catch (error) {
        res.status(500).json({ error: "Error" });
    }
});
exports.getTodos = getTodos;
const deleteTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, todoId } = req.body;
        if (!name || !todoId) {
            res.status(400).json({ message: "Missing 'name' or 'todoId'" });
        }
        const user = yield User_1.default.findOne({ name });
        if (!user) {
            res.status(404).json({ message: "User not found" });
        }
        if (user != null) {
            const updatedTodos = user.todos.filter((todo) => { var _a; return ((_a = todo._id) === null || _a === void 0 ? void 0 : _a.toString()) !== todoId; });
            if (updatedTodos.length === user.todos.length) {
                res.status(404).json({ message: "Todo not found" });
            }
            user.todos = updatedTodos;
            user.markModified("todos");
            yield user.save();
            res.status(200).json({ message: "Todo deleted successfully", data: user });
        }
    }
    catch (error) {
        console.error("Error deleting todo:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.deleteTodo = deleteTodo;
const updateTodo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, todoId, checked } = req.body;
        if (!name || !todoId || typeof checked !== "boolean") {
            res.status(400).json({ message: "Invalid input data" });
        }
        const user = yield User_1.default.findOneAndUpdate({ name, "todos._id": todoId }, { $set: { "todos.$.checked": checked } }, { new: true });
        if (!user) {
            res.status(404).json({ message: "User or Todo not found" });
        }
        res.status(200).json({ message: "Todo updated successfully", data: user });
    }
    catch (error) {
        console.error("Error updating todo status:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
exports.updateTodo = updateTodo;
