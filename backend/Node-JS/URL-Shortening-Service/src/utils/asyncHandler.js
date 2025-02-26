/**
 * @function
 * @description Wraps an Express request handler with error-handling middleware.
 *              The wrapped handler is expected to return a Promise.
 *              If the handler throws an error or returns a rejected Promise,
 *              the error is passed to the next middleware in the chain.
 * @param {Function} requestHandler The Express request handler to wrap.
 * @returns {Function} The wrapped request handler.
 */
const asyncHandler = (requestHandler) => {
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next))
        .catch((err) => next(err));
    }
};

module.exports = asyncHandler;