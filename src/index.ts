import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
import path from "path";
import todoRoutes from "./routes/todoRoutes";

const app = express();
const PORT = 3000;

mongoose
  .connect("mongodb://127.0.0.1:27017/testdb")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB:", err));

app.use(cors());
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "../src/public")));

app.use("/", todoRoutes);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../src/public/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
