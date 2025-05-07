function errorHandler(err, req, res, next) {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);

    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode).json({
        message: err.message || 'Internal Server Error',
        error: process.env.NODE_ENV === 'development' ? err.stack : {}
    });
}

module.exports = errorHandler;
