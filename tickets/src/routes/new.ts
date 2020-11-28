import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@ticketsam/common";
import { body } from "express-validator";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Valid title required"),
    body("price").isFloat({ gt: 0 }).withMessage("Valid price required"),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const {title, price} = req.body;

    const ticket = Ticket.build({
      title: title,
      price: price,
      userId: req.currentUser!.id
    });

    await ticket.save();
    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
