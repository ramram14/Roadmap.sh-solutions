class ApiResponse {
    /**
     * Construct an ApiResponse object.
     *
     * @param {number} statusCode - the HTTP status code.
     * @param {string} message - the message to be included in the response.
     * @param {any} data - the data to be included in the response.
     *
     * @property {number} statusCode - the HTTP status code.
     * @property {boolean} success - whether the request was successful or not.
     * @property {string} message - the message to be included in the response.
     * @property {any} data - the data to be included in the response.
     */
    constructor(statusCode,  message, data) {
        this.statusCode = statusCode;
        this.success = statusCode < 400;
        this.message = message;
        this.data = data;
    }
};

module.exports = ApiResponse;