import jwt from "jsonwebtoken";
import "dotenv/config";

export function verifyToken(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token" });
  }

  console.log(token);

  try {
    jwt.verify(token, process.env.ACCESS_TOKEN_KEY, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
      }
      console.log(`Inside authmiddleware`);
      console.log(decoded);
      req.user = decoded;
      next();
    });
  } catch (err) {
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
}
