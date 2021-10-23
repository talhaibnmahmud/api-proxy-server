import { ErrorRequestHandler, NextFunction, Request, Response } from 'express'

const errorHandler: ErrorRequestHandler = (error, req: Request, res: Response, next: NextFunction) => {
    if (res.headersSent) {
        return next(error);
    }

    res.status(500).json({
        success: false,
        error: error.message || 'Server Error',
        stack: process.env.NODE_ENV === 'production' ? undefined : error.stack,
    });
}
module.exports = errorHandler;
