import Product from "../models/productSchema.js";
import fs from "fs";

//Add Product
export const addProduct = async (req, res) => {
  try {
    const { title, description, price, image, category, quantity } = req.body;

    if (req.file) req.body.image = req.file.filename;

    const newProduct = new Product(req.body);
    console.log("NewProduct==>>", newProduct);
    await newProduct.save();

    res.send({ success: true, newProduct });
    console.log("New product created successfully:", newProduct);
  } catch (error) {
    console.error("Error creating the product", error);
    res.status(500).send({ success: false, error: error.message });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const allProducts = await Product.find();
    res.send({ success: true, allProducts });
  } catch (error) {
    console.error("Error getting all the products:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Delete product
export const deleteProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const findProduct = await Product.findById(productId);
    if (findProduct.image) {
      const filePath = "uploads/prdim/" + findProduct.image;
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err);
          return;
        }
        console.log("File deleted successfully");
      });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({
        success: false,
        error: "Product not found.",
      });
    }

    res.send({ message: "Product deleted successfully!" });
  } catch (error) {
    console.log("Error deleting the product:", error.message);
    res.status(500).send({ success: false, error: error.message });
  }
};

//Update a product
export const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    if (req.file) {
      const findProduct = await Product.findById(productId);
      if (findProduct.image) {
        const filePath = "uploads/prdim/" + findProduct.image;
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error("Error deleting file:", err);
            return;
          }
          console.log("File deleted successfully");
        });
      }
      req.body.image = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedProduct) {
      return res.send({ success: false, message: "Product not found" });
    }

    console.log("Product updated successfully:", updatedProduct);
    res.send({
      success: true,
      product: updatedProduct,
      message: "Updated successfully",
    });
  } catch (error) {
    console.error("Error updating the product", error.message);
    res.status(500).json({ success: false, error: error.message });
  }
};
