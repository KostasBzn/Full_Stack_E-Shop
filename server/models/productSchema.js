import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    fullDescription: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true },
    quantity: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
