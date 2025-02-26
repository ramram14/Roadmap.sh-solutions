const asyncHandler = require("../utils/asyncHandler");
const Todo = require("../models/todo");
const ApiResponse = require("../utils/ApiResponse");

/**
 * @function createTodo
 * @description Create a new todo
 * @route POST /api/todos
 * @access Private
 *
 * Steps:
 * 1. Extract title and description from the request body.
 * 2. Check if title and description are provided.
 * 3. Create a new Todo instance with the provided title, description, and user ID.
 * 4. Save the new todo to the database.
 * 5. Return a success response with the newly created todo.
 *
 * @throws {ApiError} 400 - If title or description are missing in the request body.
 * @throws {ApiError} 500 - If an error occurs while saving the todo to the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created todo.
 */
module.exports.createTodo = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    if (!title || !description) {
        return res.status(400)
            .json(new ApiResponse(400, 'Title and description are required'));
    }
    const userId = req.userId;

    // Create a new todo
    const todo = new Todo({
        title,
        description,
        user: userId
    });
    await todo.save();
    res.status(201).json(new ApiResponse(201, 'Todo created successfully', todo));
});

/**
 * @function getAllTodos
 * @description Get all todos for the authenticated user
 * @route GET /api/todos
 * @access Private
 *
 * Steps:
 * 1. Extract page and limit from
 * 2. Find all todos for the authenticated user.
 * 3. Return a success response with the todos and pagination details.
 *
 * @throws {ApiError} 500 - If an error occurs while fetching todos from the database.
 *
 * @param {Object} req - Express request object containing the refresh token in cookies.
 * @param {Object} res - Express response object used to return the new access token.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @returns {Object} JSON response with the new access token if successful.
 *
 */
module.exports.getAllTodos = asyncHandler(async (req, res, next) => {
    const page = parseInt(req.query.page) || 1; // Default page is 1
    const limit = parseInt(req.query.limit) || 5; // Default limit is 5

    const total = await Todo.countDocuments(); // Total number of all todos

    const userId = req.userId;
    const todos = await Todo.find({ user: userId })
        .skip((page - 1) * limit)
        .limit(limit);
    res.status(200).json(new ApiResponse(200, 'Fetched todos successfully', { todos, page, limit, total }));
})

/**
 * @function updateTodo
 * @description Update a todo by ID
 * @route PUT /api/todos/:id
 * @access Private
 *
 * Steps:
 * 1. Extract title and description from the request body.
 * 2. Find the todo by ID.
 * 3. Check if the todo exists and belongs to the authenticated user.
 * 4. Update the todo with the provided title and description.
 * 5. Save the updated todo to the database.
 * 6. Return a success response with the updated todo.
 * 
 * @throws {ApiError} 400 - If title or description are missing in the request body.
 * @throws {ApiError} 404 - If the todo is not found.
 * @throws {ApiError} 403 - If the todo does not belong to the authenticated user.
 * @throws {ApiError} 500 - If an error occurs while updating the todo in the database.
 *
 * @param {Object} req - Express request object containing the refresh token in cookies.
 * @param {Object} res - Express response object used to return the new access token.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @returns {Object} JSON response with the new access token if successful.
 */
module.exports.updateTodo = asyncHandler(async (req, res, next) => {
    const { title, description } = req.body;
    const todoId = req.params.id;
    if (!title || !description) {
        return res.status(400)
            .json(new ApiResponse(400, 'Title and description are required'));
    }

    const userId = req.userId;
    const todo = await Todo.findOne({ _id: todoId });

    if (!todo) {
        return res.status(404)
            .json(new ApiResponse(404, 'Todo not found'));
    }

    if (todo.user.toString() !== userId) {
        return res.status(403)
            .json(new ApiResponse(403, 'Forbidden. You are not authorized to update this todo'));
    }

    todo.title = title;
    todo.description = description;
    await todo.save();
    res.status(200).json(new ApiResponse(200, 'Todo updated successfully', todo));
});

/**
 * @function deleteTodo
 * @description Delete a todo by ID
 * @route DELETE /api/todos/:id
 * @access Private
 *
 * Steps:
 * 1. Find the todo by ID.
 * 2. Check if the todo
 * 3. Check if the todo belongs to the authenticated user.
 * 4. Delete the todo from the database.
 * 5. Return a success response.
 *
 * @throws {ApiError} 404 - If the todo is not found.
 * @throws {ApiError} 403 - If the todo does not belong to the authenticated user.
 * @throws {ApiError} 500 - If an error occurs while deleting the todo from the database.
 *
 * @param {Object} req - Express request object containing the refresh token in cookies.
 * @param {Object} res - Express response object used to return the new access token.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @returns {Object} JSON response with the new access token if successful.
 */
module.exports.deleteTodo = asyncHandler(async (req, res, next) => {
    const todoId = req.params.id;
    const userId = req.userId;
    const todo = await Todo.findOne({ _id: todoId });
    if (!todo) {
        return res.status(404)
            .json(new ApiResponse(404, 'Todo not found'));
    }

    if (todo.user.toString() !== userId) {
        return res.status(403)
            .json(new ApiResponse(403, 'Forbidden. You are not authorized to delete this todo'));
    }

    await Todo.deleteOne({ _id: todoId });
    res.status(200).json(new ApiResponse(204, 'Todo deleted successfully'));
})