import express from "express";
import dotenv from "dotenv";
import {
  createRecord,
  deleteRecord,
  getAllRecords,
  getRecordById,
  updateRecord,
} from "./database.js";

dotenv.config();

const app = express();
app.use(express.json());
const port = process.env.SERVER_PORT;

app.get("/", (req, res) => {
  res.send("Service is up..");
});

//get all todos
app.get("/todos", async (req, res) => {
  const currentTodos = await getAllRecords();
  res.send(currentTodos);
});

//get todo by id
app.get("/todos/:id", async (req, res) => {
  const currentTodo = await getRecordById(req.params.id);
  if(!currentTodo){
    return res.status(404).send("Todo is not found.")
  }
  res.send(currentTodo);
});

// update a todo
app.patch("/todos/:id", async (req, res) => {
  const currentTodo = await getRecordById(req.params.id);
  if (!currentTodo) {
    return res.status(404).send("Todo is not found.");
  }
  const { header, body } = req.body;
  const updatedTodo = await updateRecord(req.params.id, header, body);
  res.send(updatedTodo);
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  const todoId = req.params.id;
  const currentTodo = await getRecordById(todoId);
  if (!currentTodo) {
    return res.status(404).send("Todo is not found.");
  }
  await deleteRecord(todoId);
  res.send(currentTodo);
});

// create a todo
app.post("/todos", async (req, res) => {
  const { header, body } = req.body;
  const newTodo = await createRecord(header, body);
  res.send(newTodo);
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
