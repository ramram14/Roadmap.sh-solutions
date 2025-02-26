const ApiError = require("../utils/ApiError");
const jwt = require('jsonwebtoken');

/**
 * Middleware to verify the access token from the Authorization header.
 * 
 * This function checks if the request contains a valid JWT access token
 * in the Authorization header. If the token is valid, the user ID from 
 * the token is attached to the request object, and the request proceeds
 * to the next middleware. If the token is invalid or absent, an appropriate
 * ApiError is passed to the next middleware.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 * 
 * @throws {ApiError} 401 - If no token is provided, the token format is invalid,
 *                          the token is expired, or the token is otherwise invalid.
 * @throws {ApiError} 500 - If an internal server error occurs.
 */

module.exports.VerifyAccessToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return next(new ApiError(401, 'Access denied. No token provided.'));
        }

        const token = authHeader.split(' ')[1];
        if (!token) {
            return next(new ApiError(401, 'Access denied. Invalid token format.'));
        }

        const decodedToken = jwt.verify(token, process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
        if (!decodedToken || !decodedToken._id) {
            return next(new ApiError(401, 'Invalid token.'));
        }

        req.userId = decodedToken._id;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return next(new ApiError(401, 'Token has expired.'));
        } else if (err.name === 'JsonWebTokenError') {
            return next(new ApiError(401, 'Invalid token.'));
        } else {
            return next(new ApiError(500, 'Internal server error.'));
        }
    }
}