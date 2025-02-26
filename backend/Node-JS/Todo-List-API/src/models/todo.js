const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Title must be at least 3 characters'],
        maxLength: [50, 'Title cannot exceed 50 characters']
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Description must be at least 3 characters'],
        maxLength: [200, 'Description cannot exceed 200 characters']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

const Todo = mongoose.models.Todo || mongoose.model('Todo', todoSchema);
module.exports = Todo;