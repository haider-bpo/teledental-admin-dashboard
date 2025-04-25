class ApiError extends Error {
  statusCode: number;
  details: any;

  constructor(
    message: string = 'Internal server error',
    statusCode: number = 500,
    details: any = null,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
    this.name = this.constructor.name;
    // Maintain proper stack trace in non-production environments
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor);
    }
  }

  static badRequest(message: string, details: any = null): ApiError {
    return new ApiError(message, 400, details);
  }

  static unauthorized(message: string, details: any = null): ApiError {
    return new ApiError(message, 401, details);
  }

  static forbidden(message: string, details: any = null): ApiError {
    return new ApiError(message, 403, details);
  }

  static notFound(message: string, details: any = null): ApiError {
    return new ApiError(message, 404, details);
  }
}

export default ApiError;
