class CustomError extends Error {
    constructor(message, statusCode = 500, errorCode = 'UNKNOWN_ERROR', data = null) {
      super(message);
      this.statusCode = statusCode;
      this.errorCode = errorCode;
      this.data = data;
  
      // Capture the stack trace
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  module.exports = CustomError;