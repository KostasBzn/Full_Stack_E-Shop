import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongo-db.js";
import userRoutes from "./routes/userRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();

app.use("/users", userRoutes);

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
