// controllers/inventoryController.js

const { validationResult } = require('express-validator');
const { Inventory } = require('../models');

// Get all inventory items
async function getInventoryItems(req, res) {
  try {
    const inventoryItems = await Inventory.findAll();
    res.json(inventoryItems);
  } catch (error) {
    console.error('Error in getInventoryItems:', error);
    res.status(500).json({ message: 'Failed to fetch inventory items' });
  }
}

// Get a single inventory item by ID
async function getInventoryItemById(req, res) {
  try {
    const inventoryItem = await Inventory.findByPk(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    res.json(inventoryItem);
  } catch (error) {
    console.error('Error in getInventoryItemById:', error);
    res.status(500).json({ message: 'Failed to fetch inventory item' });
  }
}

// Create a new inventory item
async function createInventoryItem(req, res) {
  try {
    const newInventoryItem = await Inventory.create(req.body);
    res.status(201).json(newInventoryItem);
  } catch (error) {
    console.error('Error in createInventoryItem:', error);
    res.status(500).json({ message: 'Failed to create inventory item' });
  }
}

// Update an existing inventory item
async function updateInventoryItem(req, res) {
  try {
    let inventoryItem = await Inventory.findByPk(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    inventoryItem = await inventoryItem.update(req.body);
    res.json(inventoryItem);
  } catch (error) {
    console.error('Error in updateInventoryItem:', error);
    res.status(500).json({ message: 'Failed to update inventory item' });
  }
}

// Delete an inventory item
async function deleteInventoryItem(req, res) {
  try {
    const inventoryItem = await Inventory.findByPk(req.params.id);
    if (!inventoryItem) {
      return res.status(404).json({ message: 'Inventory item not found' });
    }
    await inventoryItem.destroy();
    res.json({ message: 'Inventory item deleted successfully' });
  } catch (error) {
    console.error('Error in deleteInventoryItem:', error);
    res.status(500).json({ message: 'Failed to delete inventory item' });
  }
}

module.exports = {
  getInventoryItems,
  getInventoryItemById,
  createInventoryItem,
  updateInventoryItem,
  deleteInventoryItem,
};
