const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./src/database/db');

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();


connectDB();

// Middleware
app.use(express.json());

// Routes
const urlRoutes = require('./src/routes/urlRoutes');
app.use('/api/shorten', urlRoutes);

// Not found handler
const ApiError = require('./src/utils/ApiError');
app.all('*', (req, res, next) => {
    next(new ApiError(404, 'Not Found', [`${req.url} method ${req.method} is wrong url`]));
});

// Global error handler
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


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});