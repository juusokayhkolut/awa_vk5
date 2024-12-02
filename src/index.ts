import express, { Request, Response } from "express";
import bodyParser from "body-parser";

type TUser = {
  name: string;
  todos: string[];
};

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

const users: TUser[] = [];

app.post("/add", (req: Request, res: Response) => {
  const { name, todo } = req.body;

  if (!name || !todo) {
    res.status(400).json({ message: "Name and Todo are required!" });
    return;
  }

  let user = users.find((user) => user.name === name);

  if (!user) {
    user = { name, todos: [] };
    users.push(user);
  }

  user.todos.push(todo);
  res.status(201).json({ message: "Todo added successfully!" });
});

app.get("/todos", (req: Request, res: Response) => {
  const { name } = req.query;

  if (!name) {
    res.status(400).json({ message: "Name is required!" });
    return;
  }

  const user = users.find((user) => user.name === name);

  if (!user) {
    res.status(404).json({ message: "User not found!" });
    return;
  }

  res.status(200).json(user.todos);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
