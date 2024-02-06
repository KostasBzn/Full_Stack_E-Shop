import express from "express";
import {
  loggedUser,
  handleRegister,
  handleSignIn,
  updateUser,
  findUser,
  emailConfirm,
} from "../controllers/userControllers.js";
import auth from "../middleware/user-auth.js";
import upload from "../middleware/mutlerLocalstorage.js";

const userRoutes = express.Router();

userRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

userRoutes.post("/register", handleRegister);
userRoutes.post("/signin", handleSignIn);
userRoutes.get("/loggeduser", auth, loggedUser);
userRoutes.get("/:userId", findUser);
userRoutes.put(
  "/updateuser/:userId",
  auth,
  upload.single("profileImage"),
  updateUser
);
userRoutes.post("/emailconfirm/:token", emailConfirm);

//should match the name attribute of the input field in your form where the file is being uploaded

export default userRoutes;
