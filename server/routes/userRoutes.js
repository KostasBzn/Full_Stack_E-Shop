import express from "express";

const userRoutes = express.Router();

userRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

export default userRoutes;
