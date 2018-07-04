const express = require('express');
const router = express.Router();
const { readAllTodo, getHistory, addTodo, checklistTodo, deleteTodo, updateHistory } = require('../controllers/todo_controller');
const User = require('../models/user');
const Todo = require('../models/todo');
const { authentication } = require('../middlewares/authentication');
const jwt = require('jsonwebtoken');

router.post('/', readAllTodo)

router.post('/history', getHistory)

router.post('/add', addTodo)

router.put('/', checklistTodo)

router.put('/history', updateHistory)

router.delete('/:id', deleteTodo)

module.exports = router;
