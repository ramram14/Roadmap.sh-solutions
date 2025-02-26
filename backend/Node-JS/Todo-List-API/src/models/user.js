const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        minLength: [3, 'Name must be at least 3 characters'],
        maxLength: [20, 'Name cannot exceed 20 characters']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minLength: [6, 'Password must be at least 6 characters']
    },
    refreshToken: {
        type: String,
    }
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.JWT_ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_ACCESS_TOKEN_EXPIRY
        });
};

userSchema.methods.generateRefreshToken = function () {
    return jwt.sign({
        _id: this._id
    },
        process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.JWT_REFRESH_TOKEN_EXPIRY
        });
};

const User = mongoose.models.User || mongoose.model('User', userSchema);
module.exports = User;