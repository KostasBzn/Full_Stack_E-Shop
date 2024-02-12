import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "../config/axios-auth";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const [errors, setErrors] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState(null);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const addProduct = async (formData) => {
    setErrors(null);
    try {
      const response = await axios.post(baseURL + `/products/add`, formData);

      if (response.data.success) {
        console.log("New Product==>>", response.data.newProduct);
      }
      setErrors(null);
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

  const deleteProduct = async (userId) => {
    try {
      const response = await axios.delete(
        baseURL + `/products/delete/${userId}`
      );

      console.log("Product deleted:", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProduct = async (productId, updatedData) => {
    try {
      const response = await axios.put(
        baseURL + `/users/updateuser/${productId}`,
        updatedData
      );

      if (response.data.success) {
        setUpdatedProduct(response.data.product);

        //navigate("/app");
        console.log("Product updated successfully!", response.data.product);
      } else {
        console.error("Error updating the product", response.data.message);
      }
    } catch (error) {
      console.error("Error updating the product", error.message);
    }
  };

  useEffect(() => {
    const getAllProducts = async () => {
      try {
        const response = await axios.get(baseURL + `/products/getall`);

        setAllProducts(response.data, allProducts);
        console.log("fetch all products:", response.data.allProducts);
      } catch (error) {
        console.error("Error fetching the products", error);
      }
    };

    getAllProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ allProducts, deleteProduct, addProduct, updateProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
