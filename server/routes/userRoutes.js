import express from "express";
import {
  loggedUser,
  handleRegister,
  handleSignIn,
  updateUser,
  findUser,
} from "../controllers/userControllers.js";
import auth from "../middleware/user-auth.js";

const userRoutes = express.Router();

userRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

userRoutes.post("/register", handleRegister);
userRoutes.post("/signin", handleSignIn);
userRoutes.get("/loggeduser", auth, loggedUser);
userRoutes.get("/:userId", findUser);
userRoutes.put("/updateuser/:userId", auth, updateUser);

export default userRoutes;
