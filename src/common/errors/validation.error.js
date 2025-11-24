const BaseError = require("./base.error");

class ValidationError extends BaseError {
    constructor(message) {
        super(message, 400, 'VALIDATION_ERROR');
    }
}

module.exports = ValidationError;
