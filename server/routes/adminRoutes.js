import express from "express";
import { body } from "express-validator";
import adminAuth from "../middleware/admin-auth.js";
import {
  deleteAdmin,
  handleRegisterAdmin,
  handleSignInAdmin,
  loggedAdmin,
} from "../controllers/adminControllers.js";

const adminRoutes = express.Router();

adminRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

adminRoutes.post(
  "/registeradmin",
  [
    // Sanitization middleware
    body("username").trim().escape(),
  ],
  handleRegisterAdmin
);
adminRoutes.post("/signinadmin", handleSignInAdmin);
adminRoutes.get("/loggedadmin", adminAuth, loggedAdmin);
adminRoutes.delete("/deleteadmin/:adminId", adminAuth, deleteAdmin);

export default adminRoutes;
