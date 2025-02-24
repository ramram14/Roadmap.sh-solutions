const express = require('express');
const connectDB = require('./database/db');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

// Connect to MongoDB
connectDB();


// Routes
const blogRoutes = require('./routes/blogRoutes');
app.use('/api/posts', blogRoutes);


// Start the server
app.listen(PORT, () => {
    try {
        console.log(`Server is running on port ${PORT}`);
    } catch (error) {
        console.log(error);
    }
})