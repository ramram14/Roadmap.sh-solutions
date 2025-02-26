const { nanoid } = require('nanoid');
const asyncHandler = require('../utils/asyncHandler');
const ApiError = require('../utils/ApiError');
const Url = require('../models/url');
const ApiResponse = require('../utils/ApiResponse');

/**
 * @function createShortenUrl
 * @description Create a new shorten url
 * @route POST /api/shorten
 * @access Public
 *
 * Steps:
 * 1. Extract url from the request body.
 * 2. Check if url is provided.
 * 3. Generate a short code.
 * 4. Create a new Url instance with the provided url and short code.
 * 5. Save the new url to the database.
 * 6. Return a success response with the newly created url.
 *
 * @throws {ApiError} 400 - If url is not provided in the request body.
 * @throws {ApiError} 500 - If an error occurs while saving the url to the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created url if successful.
 */
module.exports.createShortenUrl = asyncHandler(async (req, res, next) => {
    const { url } = req.body;
    if (!url) {
        return next(new ApiError(400, 'Url is required',));
    }

    const shortCode = nanoid(6);

    const newUrl = new Url({
        url,
        shortCode,
    });
    await newUrl.save();

    res.status(201).json(new ApiResponse(201, 'Url created successfully', newUrl));
});

/**
 * @function getOriginalUrl
 * @description Get the original url from the database using the short code.
 * @route GET /api/shorten/:shortCode
 * @access Public
 *
 * Steps:
 * 1. Extract the short code from params.
 * 2. Find the url in the database using the short code.
 * 3. If the url is not found, return a 404 error.
 * 4. Increment the accessCount of the url.
 * 5. Return a success response with the original url.
 *
 * @throws {ApiError} 404 - If the url is not found in the database.
 * @throws {ApiError} 500 - If an error occurs while fetching the url from the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created url if successful.
 */
module.exports.getOriginalUrl = asyncHandler(async (req, res, next) => {
    const { shortCode } = req.params;

    // Increment the accessCount of the url
    const url = await Url.findOneAndUpdate({ shortCode }, { $inc: { accessCount: 1 } }, { new: true });
    if (!url) {
        return next(new ApiError(404, 'Url not found'));
    }


    res.status(200).json(new ApiResponse(200, 'Url found successfully', url));
});

/**
 * @function updateOriginalUrl
 * @description Update the original url in the database using the short code.
 * @route PUT /api/shorten/:shortCode
 * @access Public
 *
 * Steps:
 * 1. Extract the shortCode from params.
 * 2. Extract the url from the request body.
 * 3. Find the url in the database using the short code.
 * 4. If the url is not found, return a 404 error.
 * 5. Update the url in the database.
 * 6. Return a success response with the updated url.
 *
 * @throws {ApiError} 404 - If the url is not found in the database.
 * @throws {ApiError} 500 - If an error occurs while updating the url in the database.
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created url if successful.
 */
module.exports.updateOriginalUrl = asyncHandler(async (req, res, next) => {
    const { shortCode } = req.params;
    const { url } = req.body;

    const originalUrlInDatabase = await Url.findOneAndUpdate({ shortCode }, { url }, { new: true });
    if (!originalUrlInDatabase) {
        return next(new ApiError(404, 'Url not found'));
    }

    res.status(200).json(new ApiResponse(200, 'Url updated successfully', originalUrlInDatabase));
});

/**
 * @function deleteUrl
 * @description Delete the url from the database using the short code.
 * @route DELETE /api/shorten/:shortCode
 * @access Public
 *
 * Steps:
 * 1. Extract the short
 * 2. Find the url in the database using the short code.
 * 3. If the url is not found, return a 404 error.
 * 4. Delete the url from the database.
 * 5. Return a success response with a 204 status code.
 *
 * @throws {ApiError} 404 - If the url is not found in the database.
 * @throws {ApiError} 500 - If an error occurs while deleting the url from the database.
 * 
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created url if successful.
 */
module.exports.deleteUrl = asyncHandler(async (req, res, next) => {
    const { shortCode } = req.params;
    const url = await Url.findOneAndDelete({ shortCode });
    if (!url) {
        return next(new ApiError(404, 'Url not found'));
    }

    res.status(200).json(new ApiResponse(204, 'Url deleted successfully'));
});

/**
 * @function getUrlStats
 * @description Get the url stats from the database using the short code.
 * @route GET /api/shorten/:shortCode/stats
 * @access Public
 *
 * Steps:
 * 1. Extract the shortCode from
 * 2. Find the url in the database using the short code and select the accessCount field.
 * 3. If the url is not found, return a 404 error.
 * 4. Return a success response with the url stats.
 * 
 * @throws {ApiError} 404 - If the url is not found in the database.
 * @throws {ApiError} 500 - If an error
 *
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express middleware function for error handling.
 *
 * @returns {Object} JSON response with the newly created url if successful.
 */
module.exports.getUrlStats = asyncHandler(async (req, res, next) => {
    const { shortCode } = req.params;
    const url = await Url.findOne({ shortCode }).select('+accessCount');
    if (!url) {
        return next(new ApiError(404, 'Url not found'));
    }
    res.status(200).json(new ApiResponse(200, 'Url found successfully', url));
})