import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import "dotenv/config";
import { matchedData, validationResult } from "express-validator";
import User from "../models/User.js";
import { comparePassword } from "../utils/comparePassword.js";

export const registerFunction = async (req, res) => {
  //const { firstName, lastName, email, password, confirmPassword } = req.body;
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const data = matchedData(req);
      console.log(data);
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(data.password, salt);
      data.password = hashedPassword;
      await User.create(data);
      return res.status(200).json({ message: "Success" });
    }

    return res.status(401).send({ errors: result.array() });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

export const loginFunction = async (req, res) => {
  //const { email, password } = req.body;
  try {
    const result = validationResult(req);

    if (result.isEmpty()) {
      const data = matchedData(req);
      console.log(data);
      const existingUser = await User.findOne({ where: { email: data.email } });
      if (!existingUser) {
        return res.status(401).json({
          errors: [
            {
              path: "email",
              msg: "The user is not registered.",
            },
          ],
        });
      } else if (
        !(await comparePassword(data.password, existingUser.password))
      ) {
        return res.status(401).json({
          errors: [
            {
              path: "password",
              msg: "Incorrect password.",
            },
          ],
        });
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          email: existingUser.email,
          firstName: existingUser.firstName,
          lastName: existingUser.lastName,
        },
        process.env.ACCESS_TOKEN_KEY,
        { expiresIn: "1d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 12,
        secure: true,
        sameSite: "None",
      });

      return res.status(200).json({ message: "Success" });
    }

    return res.status(401).send({ errors: result.array() });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const logoutFunction = async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
    sameSite: "None",
    secure: true, // change to true in production (HTTPS)
  });
  res.status(200).json({ message: "Logout succesfully." });
};
