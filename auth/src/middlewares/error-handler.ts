import { ErrorRequestHandler } from "express";
import { CustomError } from "../errors/custom-error";

export const errorHandler: ErrorRequestHandler = (
  err: Error,
  req,
  res,
  next
) => {
  if (err instanceof CustomError) {
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  res.status(500).send({ errors: [{ message: "Something went wrong" }] });
};
