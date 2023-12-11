//server.js
const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

let lists = [];

// Get all lists
app.get('/api/lists', (req, res) => {
  res.json({ lists });
});

// Create a new list
app.post('/api/lists', (req, res) => {
  const newList = { ...req.body, _id: uuidv4(), items: [] };
  lists.push(newList);
  res.status(201).json(newList);
});

// Get items of a list
app.get('/api/lists/:id/items', (req, res) => {
  const listId = req.params.id;
  const list = lists.find((list) => list._id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  res.json({ items: list.items });
});
//test git

// Update list name
app.put('/api/lists/:id', (req, res) => {
  const listId = req.params.id;
  const newName = req.body.name;

  const updatedList = lists.find((list) => list._id === listId);

  if (updatedList) {
    updatedList.name = newName;
    res.json(updatedList);
  } else {
    res.status(404).json({ error: 'List not found' });
  }
});

// Delete a list
app.delete('/api/lists/:id', (req, res) => {
  const listId = req.params.id;
  lists = lists.filter((list) => list._id !== listId);
  res.json({ message: 'List deleted successfully' });
});

// Add an item to a list
app.post('/api/lists/:id/items', (req, res) => {
  const listId = req.params.id;
  const list = lists.find((list) => list._id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  const newItem = { ...req.body, _id: uuidv4() };
  list.items.push(newItem);
  res.status(201).json(newItem);
});

// Delete an item from a list
app.delete('/api/lists/:listId/items/:itemId', (req, res) => {
  const listId = req.params.listId;
  const itemId = req.params.itemId;

  const list = lists.find((l) => l._id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  list.items = list.items.filter((item) => item._id !== itemId);
  res.json({ message: 'Item deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
