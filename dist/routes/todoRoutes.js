"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const todoController_1 = require("../controllers/todoController");
const router = express_1.default.Router();
router.post("/add", todoController_1.addTodo);
router.get("/todos", todoController_1.getTodos);
router.put("/update", todoController_1.updateTodo);
router.delete("/delete", todoController_1.deleteTodo);
exports.default = router;
