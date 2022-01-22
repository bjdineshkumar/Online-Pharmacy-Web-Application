class Response {
    constructor(success, payload, code, message) {
        this.success = success;
        this.payload = payload;
        this.code = code;
        this.message = message;
    }
}

module.exports = Response;