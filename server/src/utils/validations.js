import { body } from "express-validator";
import User from "../models/User.js";

export const registerValidationRules = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Please provide a valid email")
    .custom(async (email) => {
      const user = await User.findOne({ where: { email } });
      if (user) {
        throw new Error("Email is already registered");
      }
      return true;
    }),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters"),
  body("confirmPassword").custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error("Password confirmation does not match password");
    }
    return true;
  }),
];

export const loginValidationRules = [
  body("email").isEmail().withMessage("Please provide a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
];

export const taskInputValidationRules = [
  body("title")
    .isString()
    .withMessage("Title must be in string format")
    .notEmpty()
    .withMessage("Title must not be empty"),
  body("description").notEmpty().withMessage("Description is required"),
  body("status").notEmpty().withMessage("Status is required"),
];

export const taskEditValidationRules = [
  body("title").optional().isString().isLength({ min: 1 }),
  body("description").optional().isString(),
  body("status").optional().isIn(["pending", "in progress", "completed"]),
];
