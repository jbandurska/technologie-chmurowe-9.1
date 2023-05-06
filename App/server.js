const { v4: uuidv4 } = require("uuid");
const express = require("express");
const app = express();

const port = 3000;

let users = [];

app.use(express.json());

app.get("/users", (req, res) => {
  res.json({ users });
});

app.post("/users", (req, res) => {
  const id = uuidv4();
  const newUser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
    id: id,
  };
  users.push(newUser);
  res.json({ message: `User has been added with id ${id}` });
});

app.put("/users/:id", (req, res) => {
  const id = req.params.id;
  const updatedUser = {
    name: req.body.name,
    username: req.body.username,
    email: req.body.email,
  };
  const userIndex = users.findIndex((user) => user.id === id);
  const oldUser = users[userIndex];
  users[userIndex] = { ...oldUser, ...updatedUser };
  res.json({ message: `User with id ${id} has been updated.` });
});

app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  users = users.filter((user) => user.id !== id);
  res.json({ message: `User with id ${id} has been deleted.` });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}.`);
});
