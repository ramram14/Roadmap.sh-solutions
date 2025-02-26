class ApiError extends Error {
    /**
     * Constructor for ApiError class.
     *
     * @param {number} statusCode HTTP status code.
     * @param {string} [message='Something went wrong'] Error message.
     * @param {Array<Error|string>|Error|string} [errors=[]] Error(s) to include in the error object.
     * @param {string} [stack=''] Optional stack trace.
     */
    constructor(
        statusCode,
        message = 'Something went wrong',
        errors,
        stack = ''
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors && Array.isArray(errors) ? errors : errors ? [errors] : undefined;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
};

module.exports = ApiError;