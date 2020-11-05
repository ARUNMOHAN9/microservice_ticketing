import { ErrorRequestHandler } from "express";
import { DatabaseConnectionError } from "../errors/database-connection-error";
import { RequestValidationError } from "../errors/request-validation-error";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  if (err instanceof RequestValidationError) {
    const formattedErrors = err.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));

    return res.status(400).send({ errors: formattedErrors });
  }

  if (err instanceof DatabaseConnectionError) {
    return res.status(500).send({ errors: [{ message: err.reason }] });
  }
};
