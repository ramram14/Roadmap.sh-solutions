const Blog = require('../models/blogModel');
const mongoose = require('mongoose');

/**
 * Creates a new blog post.
 * 
 * This asynchronous function handles the creation of a new blog post.
 * It expects a request with the blog details (title, content, category, and tags)
 * in the body. If any of these fields are missing, it returns a 400 status 
 * with an appropriate error message. Upon successful creation, it saves the 
 * new blog post to the database and returns a 201 status with a success message 
 * and the new blog's ID. In case of validation errors or other exceptions, 
 * it returns a 400 or 500 status with an error message respectively.
 *
 * @param {Object} req - The HTTP request object, containing blog details in the body.
 * @param {Object} res - The HTTP response object used to send back the appropriate HTTP status and message.
 * @returns {JSON} - A JSON object containing the status and message of the operation.
 */
const createBlog = async (req, res) => {
    try {
        const { title, content, category, tags } = req.body;

        // Validate the input
        if (!title || !content || !category || !tags) {
            return res.status(400)
                .json({
                    success: false,
                    message: "All fields are required: title, content, category, tags",
                });
        }

        const newBlog = new Blog({
            title,
            content,
            category,
            tags
        });

        await newBlog.save();

        res.status(201)
            .json({
                success: true,
                message: "Blog created successfully",
                data: "Your blog id is " + newBlog._id,
            });
    } catch (error) {
        // Handle validation errors
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error creating blog, internal server error",
            });
        }
    }
}

/**
 * 
 * This asynchronous function handles the retrieval of all blog posts.
 * It expects a GET request with an optional query parameter 'term' for searching
 * for blogs with matching tags. If a search term is provided, it searches for
 * blogs with matching tags. If no search term is provided, it fetches all blogs.
 * The response is a JSON object containing the status and message of the operation,
 * and the data containing the list of blogs.
 *
 * @param {Object} req - The HTTP request object, containing the query parameter 'term'.
 * @param {Object} res - The HTTP response object used to send back the appropriate HTTP status and message.
 * @returns {JSON} - A JSON object containing the status and message of the operation.
 */
const getAllBlogs = async (req, res) => {
    try {
        const { term = '' } = req.query;
        const searchTerm = term.replaceAll(' ', '-').toLowerCase(); // Replace spaces with hyphens

        // If a search term is provided, search for blogs with matching tags
        if (term && searchTerm) {
            const blogs = await Blog.find({
                $or: [
                    { "tags": { $in: [searchTerm] } },
                ],
            });
            return res.status(200).json({
                success: true,
                message: "Blogs fetched successfully",
                data: blogs,
            });
        }

        // If no search term is provided, fetch all blogs
        const blogs = await Blog.find();
        res.status(200)
            .json({
                success: true,
                message: "All blogs fetched successfully",
                data: blogs
            })
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Error fetching blogs",
            })
    }
};

/**
 * Fetches a blog post by its ID.
 * 
 * This asynchronous function takes the blog ID as a parameter from the request object.
 * It checks if the provided ID is a valid MongoDB ID, and if so, fetches the blog 
 * post from the database. If the blog post is found, it returns a 200 status with 
 * the blog post data. If the blog post is not found or an error occurs, it returns 
 * a 404 or 500 status with an appropriate error message respectively.
 * 
 * @param {Object} req - The HTTP request object, containing the blog ID in the params.
 * @param {Object} res - The HTTP response object used to send back the appropriate HTTP status and message.
 * @returns {JSON} - A JSON object containing the status and message of the operation.
 */
const getBlogById = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid blog ID format, blog not found"
            });
        }

        const blog = await Blog.findById(id);

        if (!blog) {
            console.log("Blog not found");
            res.status(404)
                .json({
                    success: false,
                    message: "Blog not found"
                })
            return;
        }

        res.status(200)
            .json({
                success: true,
                message: "Blog fetched successfully",
                data: blog
            })
    } catch (error) {
        res.status(500)
            .json({
                success: false,
                message: "Error fetching blog",
            })
    }
}

/**
 * Updates an existing blog post by ID.
 *
 * This asynchronous function handles updating a blog post with the given ID.
 * It expects a request containing the blog ID in the URL parameters and the 
 * updated blog details (title, content, category, and tags) in the request body.
 * If any validation errors occur, it returns a 400 status with an error message.
 * If the blog ID format is invalid or the blog is not found, it returns a 404 status.
 * Upon successful update, it returns a 200 status with a success message.
 * In case of any other errors, it returns a 500 status with an internal server error message.
 *
 * @param {Object} req - The HTTP request object, containing blog ID in parameters and updated details in the body.
 * @param {Object} res - The HTTP response object used to send back the appropriate HTTP status and message.
 * @returns {JSON} - A JSON object containing the status and message of the operation.
 */
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid blog ID format, blog not found"
            });
        }

        // Validate the input
        const { title, content, category, tags } = req.body;

         // Validate the input
         if (!title || !content || !category || !tags) {
            return res.status(400)
                .json({
                    success: false,
                    message: "All fields are required: title, content, category, tags",
                });
        }

        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { title, content, category, tags },
            { new: true, runValidators: true } // Enable validation
        );

        if (!updatedBlog) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Blog not found"
                })
        }
        res.status(200)
            .json({
                success: true,
                message: "Blog updated successfully",
            })
    } catch (error) {
        // Handle validation errors
        if (error instanceof mongoose.Error.ValidationError) {
            return res.status(400).json({
                success: false,
                message: error.message,
            });
        } else {
            res.status(500).json({
                success: false,
                message: "Error updating blog, internal server error",
            });
        }
    }
}

/**
 * Deletes a blog post by its ID.
 *
 * This asynchronous function takes the blog ID as a parameter from the request object.
 * It checks if the provided ID is a valid MongoDB ID, and if so, deletes the blog post
 * from the database. If the blog post is found, it returns a 204 status with a success message.
 * If the blog post is not found or an error occurs, it returns a 404 or 500 status with an
 * appropriate error message respectively.
 *
 * @param {Object} req - The HTTP request object, containing the blog ID in the params.
 * @param {Object} res - The HTTP response object used to send back the appropriate HTTP status and message.
 * @returns {JSON} - A JSON object containing the status and message of the operation.
 */
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the provided ID is a valid MongoDB ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({
                success: false,
                message: "Invalid blog ID format, blog not found"
            });
        }

        const blog = await Blog.findByIdAndDelete(id);

        if (!blog) {
            return res.status(404)
                .json({
                    success: false,
                    message: "Blog not found"
                })
        }

        res.status(204)
            .json({
                success: true,
                message: "Blog deleted successfully",
            })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error updating blog, internal server error",
        });
    }
}

module.exports = {
    createBlog,
    getAllBlogs,
    getBlogById,
    updateBlog,
    deleteBlog
}