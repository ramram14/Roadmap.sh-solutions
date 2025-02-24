const express = require('express');
const { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog } = require('../controllers/blogControllers');

const router = express.Router();

/**
* @route POST /api/posts
* @desc Create a new blog
* @access Public
*/
router.post('/', createBlog);

/**
* @route GET /api/posts
* @desc Get all blogs
* @access Public
*/
router.get('/', getAllBlogs);

/**
* @route GET /api/posts/:id
* @desc Get a single blog by ID
* @access Public
*/
router.get('/:id', getBlogById);

/**
* @route PUT /api/posts/:id
* @desc Update a blog by ID
* @access Public
*/
router.put('/:id', updateBlog);

/**
* @route DELETE /api/posts/:id
* @desc Delete a blog by ID
* @access Public
*/
router.delete('/:id', deleteBlog);

module.exports = router;