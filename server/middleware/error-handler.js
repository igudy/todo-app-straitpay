import { CustomAPIError } from "../errors/custom-error.js";

function errorHandlerMiddleware(err, req, res, next) {
  return res.status(err.statusCode || 500).json({ msg: err.message });
}

export default errorHandlerMiddleware
