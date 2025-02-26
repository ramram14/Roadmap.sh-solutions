const express = require('express');
const connectDB = require('./src/database/db');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const ApiError = require('./src/utils/ApiError');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
connectDB();

// Auth Routes
const authRoutes = require('./src/routes/authRoutes');
app.use('/api/auth', authRoutes);

// Todos Routes
const todosRoutes = require('./src/routes/todosRoutes');
app.use('/api/todos', todosRoutes);


// Not found handler
app.all('*', (req, res, next) => {
    next(new ApiError(404, 'Not Found', [`${req.url} method ${req.method} is wrong url`]));
});

// 🔥 Global Error Handling Middleware
app.use((err, req, res, next) => {
    console.log(err);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    const errors = err.errors;

    res.status(statusCode).json({
        success: false,
        message: message,
        errors: errors,
    });
});

// Start the server
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})