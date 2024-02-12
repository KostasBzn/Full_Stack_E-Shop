import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "../config/axios-auth";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const [errors, setErrors] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;

  //Add product
  const addProduct = async (formData) => {
    setErrors(null);
    try {
      const response = await axios.post(baseURL + `/products/add`, formData);

      if (response.data.success) {
        console.log("New Product==>>", response.data.newProduct);
      }
      setErrors(null);
      alert("Product added successfully");
      //window.location.replace("/signedin");
      //window.location.reload();
    } catch (error) {
      console.error("Error", error);
      if (Array.isArray(error.response.data.message)) {
        setErrors(error.response.data.message);
      } else {
        const error = [
          {
            message: error.response.data.message,
          },
        ];
        setErrors(error);
      }
    }
  };

  //find product
  const findProduct = async (productId) => {
    try {
      const response = await axios.get(
        baseURL + `/products/findproduct/${productId}`
      );

      if (response.data.success) {
        setSelectedProduct(response.data.product);
        console.log("Product found successfully!", response.data.product);
      } else {
        console.error("Product not found");
      }
    } catch (error) {
      console.error("Error finding the product", error.message);
    }
  };

  //filter product by category
  const filterProductsByCategory = async (selectedCategory) => {
    try {
      const response = await axios.get(
        baseURL + `/products/category/${selectedCategory}`
      );

      if (response.data.success) {
        setAllProducts(response.data.products);
        console.log("Products found by category", response.data.products);
      } else {
        console.error("Products not found by category");
      }
    } catch (error) {
      console.error("Error finding the products by category", error.message);
    }
  };

  //Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        baseURL + `/products/delete/${productId}`
      );

      console.log("Product deleted:", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  //Update product
  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        baseURL + `/products/editproduct/${productId}`,
        updatedData
      );

      if (response.data.success) {
        //navigate("/app");
        console.log("Product updated successfully!", response.data.product);
      } else {
        console.error("Error updating the product", response.data.message);
      }
    } catch (error) {
      console.error("Error updating the product", error.message);
    }
  };

  //Get all products
  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(baseURL + `/products/getall`);

        setAllProducts(response.data.allProducts);
        console.log("fetch all products:", response.data.allProducts);
      } catch (error) {
        console.error("Error fetching the products", error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        selectedProduct,
        errors,
        deleteProduct,
        addProduct,
        updateProduct,
        findProduct,
        filterProductsByCategory,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
