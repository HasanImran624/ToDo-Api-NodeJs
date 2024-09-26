const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());                   // express use cors middleware, it enable cros origin requests, allowing your frontend to communicate with the backend that is deployed on different port or domain
app.use(express.json());           // this is built in middleware in express that parse incoming request with JSON, as we are using JSON b/w UI and backend

let todos = [];
let nextId = 1;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST a new todo
app.post('/api/todos', (req, res) => {
  const newTodo = {
    id: nextId++,
    task: req.body.task,
  };
  todos.push(newTodo);
  res.json(newTodo);
});

// DELETE a todo by id
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  todos = todos.filter(todo => todo.id !== id);
  res.sendStatus(204); // No content
});

// Start server on port 3000
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
