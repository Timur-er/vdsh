module.exports  = class ApiError extends Error{
    status;
    errors;

    constructor(status, message, errors =[]) {
        super(message);
        this.status = status
        this.message = message
    }

    static badRequest(message) {
        return new ApiError(404, message)
    }
    static unauthorizedError(message) {
        return new ApiError(401, message)
    }
    static internal(message) {
        return new ApiError(500, message)
    }
}