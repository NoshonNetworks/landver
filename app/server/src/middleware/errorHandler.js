function errorHandler(err, req, res, next) {
    const { statusCode = 500, message, errorCode = 'SERVER_ERROR', data = null } = err;
  
    // Send a structured error response
    res.status(statusCode).json({
      error: {
        message,
        code: errorCode,
        data,
      },
    });
  }
  
  module.exports = errorHandler;
  