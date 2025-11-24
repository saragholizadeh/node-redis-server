function interceptor(req, res, next) {
    res.success = (data, message = 'OK') => {
        res.json({
            success: true,
            message,
            data,
            timestamp: new Date().toISOString(),
        });
    };
    next();
}

module.exports = interceptor;
