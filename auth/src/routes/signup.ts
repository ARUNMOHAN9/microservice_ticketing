import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";
import { ValidateRequest } from "../middlewares/validate-req";

import { User } from "../models/user.model";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be b/w 4 and 20 characters"),
  ],
  ValidateRequest,
  async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const user = User.build({ email: email, password: password });
    await user.save();

    // generate and send JWT token
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
