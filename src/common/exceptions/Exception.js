"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
class Exception extends Error {
    constructor(statusCode, message) {
        super();
        this.statusCode = statusCode;
        this.statusCode = statusCode;
        this.message = message;
    }
}
exports.Exception = Exception;
