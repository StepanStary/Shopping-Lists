// controllers/listController.js
const { v4: uuidv4 } = require('uuid');
const { validateListName, validateItem } = require('../validation/listValidator');

let lists = [];

// Získání všech seznamů
const getAllLists = (req, res) => {
  res.json({ lists });
};

// Vytvoření nového seznamu
const createList = (req, res) => {
  const newListData = req.body;

  if (!validateListName(newListData.name)) {
    return res.status(400).json({ error: 'Invalid list name' });
  }

  const newList = { ...newListData, _id: uuidv4(), items: [] };
  lists.push(newList);
  res.status(201).json(newList);
};

// Získání položek konkrétního seznamu
const getListItems = (req, res) => {
  const listId = req.params.id;
  const list = lists.find((list) => list._id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  res.json({ items: list.items });
};

// Aktualizace názvu seznamu
const updateListName = (req, res) => {
  const listId = req.params.id;
  const newName = req.body.name;

  const updatedList = lists.find((list) => list._id === listId);

  if (!validateListName(newName)) {
    return res.status(400).json({ error: 'Invalid list name' });
  }

  if (updatedList) {
    updatedList.name = newName;
    res.json(updatedList);
  } else {
    res.status(404).json({ error: 'List not found' });
  }
};

// Smazání seznamu
const deleteList = (req, res) => {
  const listId = req.params.id;
  lists = lists.filter((list) => list._id !== listId);
  res.json({ message: 'List deleted successfully' });
};

// Přidání položky do seznamu
const addItemToList = (req, res) => {
  const listId = req.params.id;
  const list = lists.find((list) => list._id === listId);
  const newItemData = req.body;

  if (!validateItem(newItemData.item)) {
    return res.status(400).json({ error: 'Invalid item' });
  }

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  const newItem = { ...newItemData, _id: uuidv4() };
  list.items.push(newItem);
  res.status(201).json(newItem);
};

// Smazání položky ze seznamu
const deleteItemFromList = (req, res) => {
  const listId = req.params.listId;
  const itemId = req.params.itemId;

  const list = lists.find((l) => l._id === listId);

  if (!list) {
    return res.status(404).json({ error: 'List not found' });
  }

  list.items = list.items.filter((item) => item._id !== itemId);
  res.json({ message: 'Item deleted successfully' });
};

module.exports = {
  getAllLists,
  createList,
  getListItems,
  updateListName,
  deleteList,
  addItemToList,
  deleteItemFromList,
};
