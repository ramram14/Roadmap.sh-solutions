const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");
const User = require("../models/user");
const ApiError = require("../utils/ApiError");
const jwt = require('jsonwebtoken');

/**
 * @function refreshAccessToken
 * @description Handles refreshing the access token using a valid refresh token from cookies.
 * 
 * This function checks for a refresh token in the request cookies, verifies its validity, 
 * and generates a new access token if everything is correct.
 * 
 * @route POST /api/auth/refresh-token
 * @access Public (requires a valid refresh token)
 * 
 * Steps:
 * 1. Retrieve the refresh token from cookies.
 * 2. Verify the refresh token using the JWT secret key.
 * 3. Extract the user ID from the token and find the user in the database.
 * 4. Ensure the refresh token matches the one stored in the database.
 * 5. Generate a new access token and return it in the response.
 * 
 * @throws {ApiError} 401 - If no refresh token is provided, the token is invalid, or does not match the stored token.
 * @throws {ApiError} 404 - If the user is not found.
 * @throws {ApiError} 500 - If an internal error occurs while processing the request.
 * 
 * @param {Object} req - Express request object containing the refresh token in cookies.
 * @param {Object} res - Express response object used to return the new access token.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @returns {Object} JSON response with the new access token if successful.
 */

module.exports.refreshAccessToken = asyncHandler(async (req, res, next) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken;
        if (!incomingRefreshToken) {
            return next(new ApiError(401, "Unauthorized"))
        }
        const userId = jwt.verify(incomingRefreshToken, process.env.JWT_REFRESH_TOKEN_SECRET_KEY)?._id;
        if (!userId) {
            return next(new ApiError(401, "Unauthorized"))
        }

        const user = await User.findById(userId)
        if (!user) {
            return next(new ApiError(404, "User not found"))
        }
        if (user.refreshToken !== incomingRefreshToken) {
            return next(new ApiError(401, "Unauthorized"))
        }

        // Generate new access token
        const newAccessToken = user.generateAccessToken()

        res
            .status(200)
            .json(new ApiResponse(200, 'Success', { accessToken: newAccessToken }));
    } catch (error) {
        return next(new ApiError(500, "Something went wrong while generating refresh and access token"))
    }
})

/**
 * @function RegisterUser
 * @description Handles user registration.
 * 
 * This function registers a new user by creating a new instance of the User model and saving it to the database.
 * 
 * @route POST /api/auth/register
 * @access Public
 * 
 * Steps:
 * 1. Extract user details from the request body.
 * 2. Check if all required fields are provided.
 * 3. Check if the password is at least 6 characters long.
 * 4. Check if the user with the provided email already exists.
 * 5. Create a new user instance and save it to the database.
 * 6. Generate a refresh token and store it in the user's document.
 * 7. Generate an access token and return it in the response.
 *
 * @throws {ApiError} 400 - If any required field is missing or password is too short.
 * @throws {ApiError} 400 - If the user with the provided email already exists.
 *
 * @param {Object} req - Express request object containing the refresh token in cookies.
 * @param {Object} res - Express response object used to return the new access token.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @returns {Object} JSON response with the new access token if successful.
 */
module.exports.RegisterUser = asyncHandler(async (req, res, next) => {
    const { name, email, password } = req.body;


    // Check if all fields are provided
    if (!name || !email || !password) {
        return next(new ApiError(400, 'All fields are required'));
    }

    // Check if password is at least 6 characters
    if (password.length < 6) {
        return next(new ApiError(400, 'Password must be at least 6 characters'));
    }

    // Check if user email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
        return next(new ApiError(400, 'User already exists'));
    }

    const user = new User({ name, email, password });


    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: false,
    }

    res
        .status(200)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, 'User registered successfully', { accessToken }))
});

/**
 * @function LoginUser
 * @description Handles user login.
 *
 * This function logs in a user by checking if the provided email and password match the user's credentials.
 *
 * @route POST /api/auth/login
 * @access Public
 *
 * Steps:
 * 1. Extract email and password from the request body.
 * 2. Find the user with the provided email in the database.
 * 3. Check if the user exists.
 * 4. Check if the provided password matches the user's password.
 * 5. Generate an access token and return it in the response.
 *
 * @throws {ApiError} 400 - If the email or password is invalid.
 *
 * @param {Object} req - Express request object containing the email and password.
 * @param {Object} res - Express response object used to return the access token.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the access token if successful.
 */
module.exports.LoginUser = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return next(new ApiError(400, 'Invalid email or password'));
    }
    const isPasswordCorrect = await user.isPasswordCorrect(password);
    if (!isPasswordCorrect) {
        return next(new ApiError(400, 'Invalid email or password'));
    }

    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()
    user.refreshToken = refreshToken
    await user.save();

    const options = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: false,
    }


    res.status(200)
        .cookie('refreshToken', refreshToken, options)
        .json(new ApiResponse(200, 'User logged in successfully', { accessToken }))
});