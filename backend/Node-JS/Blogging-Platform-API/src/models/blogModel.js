const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Title must be at least 3 characters'],
        maxLength: [100, 'Title cannot exceed 100 characters']
    },
    content: {
        type: String,
        required: true,
        trim: true,
        minLength: [10, 'Content must be at least 10 characters'],
        maxLength: [100000, 'Content cannot exceed 100000 characters']
    },
    category: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Category must be at least 3 characters'],
        maxLength: [50, 'Category cannot exceed 50 characters']
    },
    tags: {
        type: [String],
        required: true,
        trim: true,
        minLength: [1, 'At least one tag is required'],
        maxLength: [10, 'Cannot have more than 10 tags']
    }
}, {
    timestamps: true
});

const Blog = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
module.exports = Blog;