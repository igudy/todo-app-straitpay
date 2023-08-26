function CustomAPIError(message, statusCode) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

function createCustomError(message, statusCode) {
  return CustomAPIError(message, statusCode);
}

export { CustomAPIError, createCustomError };
