
const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const authenticateUser = require('../helpers/auth'); 


router.get('/inventorylist', authenticateUser,inventoryController.getInventoryItems);
router.get('/inventorylist/:id', authenticateUser,inventoryController.getInventoryItemById);
router.post('/newinventory', authenticateUser, inventoryController.createInventoryItem);
router.put('/inventory/:id', authenticateUser, inventoryController.updateInventoryItem);
router.delete('/inventory/:id', authenticateUser, inventoryController.deleteInventoryItem);

module.exports = router;
