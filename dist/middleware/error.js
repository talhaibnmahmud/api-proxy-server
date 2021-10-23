"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (error, req, res, next) => {
    if (res.headersSent) {
        return next(error);
    }
    res.status(500).json({
        success: false,
        error: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
};
module.exports = errorHandler;
