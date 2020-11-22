import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ticketsam/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Valid title required"),
    body("title").isFloat({ gt: 0 }).withMessage("Valid price required"),
  ],
  validateRequest,
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };
