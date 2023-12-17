// api/routes/listRoutes.js
const express = require('express');
const router = express.Router();
const listController = require('../controllers/listController');

// Získání všech seznamů
router.get('/lists', listController.getAllLists);

// Vytvoření nového seznamu
router.post('/lists', listController.createList);

// Získání položek konkrétního seznamu
router.get('/lists/:id/items', listController.getListItems);

// Aktualizace názvu seznamu
router.put('/lists/:id', listController.updateListName);

// Smazání seznamu
router.delete('/lists/:id', listController.deleteList);

// Přidání položky do seznamu
router.post('/lists/:id/items', listController.addItemToList);

// Smazání položky ze seznamu
router.delete('/lists/:listId/items/:itemId', listController.deleteItemFromList);

// Aktualizace stavu oznacených položek
router.put('/lists/:id/checked-items', listController.updateCheckedItems);

// Ziskání stavu oznacených položek pro konkrétní seznam
router.get('/lists/:id/checked-items', listController.getCheckedItems);

module.exports = router;
