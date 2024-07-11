const { validationResult } = require('express-validator');
const { Employee } = require('../models');

// Get all employees
async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.findAll();
    res.json(employees);
  } catch (error) {
    console.error('Error in getAllEmployees:', error);
    res.status(500).json({ message: 'Failed to fetch employees' });
  }
}

// Get a single employee by ID
async function getEmployeeById(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error in getEmployeeById:', error);
    res.status(500).json({ message: 'Failed to fetch employee' });
  }
}

// Create a new employee
async function createEmployee(req, res) {
  try {
    const newEmployee = await Employee.create(req.body);
    res.status(201).json(newEmployee);
  } catch (error) {
    console.error('Error in createEmployee:', error);
    res.status(500).json({ message: 'Failed to create employee' });
  }
}

// Update an existing employee
async function updateEmployee(req, res) {
  try {
    let employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    employee = await employee.update(req.body);
    res.json(employee);
  } catch (error) {
    console.error('Error in updateEmployee:', error);
    res.status(500).json({ message: 'Failed to update employee' });
  }
}

// Delete an employee
async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findByPk(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    await employee.destroy();
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error in deleteEmployee:', error);
    res.status(500).json({ message: 'Failed to delete employee' });
  }
}

module.exports = {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
};
