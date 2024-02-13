import express from "express";
import {
  addProduct,
  deleteProduct,
  filterProductsByCategory,
  findProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/productControllers.js";
import { productImageUpload } from "../middleware/mutlerLocalstorage.js";
const productRoutes = express.Router();

productRoutes.get("/healthcheck", (req, res) => {
  res.sendStatus(200);
});

productRoutes.post(
  "/add",
  productImageUpload.single("productImage"),
  addProduct
);
productRoutes.get("/getall", getAllProducts);
productRoutes.delete("/delete/:productId", deleteProduct);
productRoutes.get("/findproduct/:productId", findProduct);
productRoutes.put(
  "/editproduct/:productId",
  //should match the name attribute of the input field in your form where the file is being uploaded
  productImageUpload.single("productImage"),
  updateProduct
);
productRoutes.get("/category/:selectedCategory?", filterProductsByCategory);

export default productRoutes;
