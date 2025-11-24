function errorHandler(err, req, res, next) {
    const status = err.status || 500;
    const code = err.code || 'INTERNAL_ERROR';
    res.status(status).json({
        success: false,
        error: { code, message: err.message },
        timestamp: new Date().toISOString(),
    });
}

module.exports = errorHandler;
