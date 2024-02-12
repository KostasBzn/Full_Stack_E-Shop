import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./config/mongo-db.js";
import userRoutes from "./routes/userRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import productRoutes from "./routes/productRoutes.js";

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use(cors());

connectDB();
app.use("/uploads", express.static("uploads"));

app.use("/users", userRoutes);
app.use("/admins", adminRoutes);
app.use("/products", productRoutes);

app.listen(port, () => {
  console.log(`The server is running in port ${port}`);
});
