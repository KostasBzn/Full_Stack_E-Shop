import express from "express";
import {
  LoggedUser,
  handleRegister,
  handleSignIn,
  updateUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/user-auth.js";

const userRoutes = express.Router();

userRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

userRoutes.post("/register", handleRegister);
userRoutes.post("/signin", handleSignIn);
userRoutes.get("/loggeduser", auth, LoggedUser);
userRoutes.put("/udateuser", auth, updateUser);

export default userRoutes;
