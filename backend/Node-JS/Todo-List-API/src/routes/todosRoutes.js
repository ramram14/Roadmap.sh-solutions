const express = require('express');
const { VerifyAccessToken } = require('../middleware/authMiddleware');
const { createTodo, updateTodo, deleteTodo, getAllTodos } = require('../controllers/todosControllers');

const router = express.Router();

/**
* @route POST /api/todos
* @desc Allow only authenticated users to interact with todo in this route
* @access Private
*/
router.use(VerifyAccessToken);

/**
* @route POST /api/todos
* @desc Create a new todo
* @access Private
*/
router.post('/', createTodo);

/**
* @route GET /api/todos
* @desc Get all todos
* @access Private
*/
router.get('/', getAllTodos);

/**
* @route PUT /api/todos/:id
* @desc Update a todo by ID
* @access Private
*/
router.put('/:id', updateTodo);

/**
* @route DELETE /api/todos/:id
* @desc Delete a todo by ID
* @access Private
*/
router.delete('/:id', deleteTodo);

module.exports = router;
