import express from "express";
import cookieParser from "cookie-parser";
import routes from "../src/routes/indexRoute.js";
import { verifyToken } from "./middlewares/authMiddleware.js";
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(routes);

app.get("/test", verifyToken, (req, res) => {
  console.log(req.cookies);
  console.log(req.user);
  return res.json({ user: req.user });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
