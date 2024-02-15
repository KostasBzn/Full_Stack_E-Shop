import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "../config/axios-auth";
import { useNavigate } from "react-router-dom";

export const ProductContext = createContext();

const ProductContextProvider = ({ children }) => {
  const [allProducts, setAllProducts] = useState(null);
  const [errors, setErrors] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [basket, setBasket] = useState([]);
  const baseURL = import.meta.env.VITE_BASE_URL;

  const navigate = useNavigate();

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
      getAllProducts();
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

  //filter product by price
  const filterProductsByPrice = async (minPrice, maxPrice) => {
    try {
      const response = await axios.get(
        baseURL +
          `/products/filterprice?minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      if (response.data.success) {
        setAllProducts(response.data.products);
        console.log("Products found by price", response.data.products);
      } else {
        console.error("Products not found by price");
      }
    } catch (error) {
      console.error("Error finding the products by price", error.message);
    }
  };

  //Delete product
  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        baseURL + `/products/delete/${productId}`
      );
      getAllProducts();
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
        navigate("/admin/products");
        getAllProducts();
        console.log("Product updated successfully!", response.data.product);
      } else {
        console.error("Error updating the product", response.data.message);
      }
    } catch (error) {
      console.error("Error updating the product", error.message);
    }
  };

  //Get all products
  const getAllProducts = async () => {
    try {
      const response = await axios.get(baseURL + `/products/getall`);

      setAllProducts(response.data.allProducts);
      console.log("fetch all products:", response.data.allProducts);
    } catch (error) {
      console.error("Error fetching the products", error);
    }
  };

  //Update quantities in database
  const updateQuantites = async (updatedData) => {
    try {
      const response = await axios.put(
        baseURL + `/products/updatequantities`,
        updatedData
      );
      if (response.data.success) {
        localStorage.removeItem("shoppingBasket");
        getAllProducts();
        getBasket();
        navigate("/home");
        console.log("Quantities updated:", response.data.success);
      }
    } catch (error) {
      console.error("Error updating the quantities", error);
    }
  };

  //fetch all products
  useEffect(() => {
    getAllProducts();
  }, []);

  //add to basket
  const addToBasket = (productId) => {
    const productToAdd = allProducts.find(
      (product) => product._id === productId
    );

    if (productToAdd) {
      const existingProductIndex = basket.findIndex(
        /* I get an error here, when the basklet is empty */
        (product) => product._id === productId
      );

      // Calculate the total quantity of this product already in the basket
      const totalQuantityInBasket = basket.reduce((total, product) => {
        if (product._id === productId) {
          return total + product.basketQuantity;
        }
        return total;
      }, 0);

      // Check if adding one more item would exceed the available quantity
      if (productToAdd.quantity < totalQuantityInBasket + 1) {
        // If so, prevent the addition and display a message
        alert("You cannot add more items than the available quantity");
        return;
      }

      if (existingProductIndex !== -1) {
        const updatedBasket = [...basket];
        updatedBasket[existingProductIndex].basketQuantity += 1;
        setBasket(updatedBasket);
        console.log("Quantity updated for product:", productToAdd);
        localStorage.setItem("shoppingBasket", JSON.stringify(updatedBasket));
      } else {
        const updatedBasket = [
          ...basket,
          { ...productToAdd, basketQuantity: 1 },
        ];
        setBasket(updatedBasket);
        console.log("Product added to basket:", productToAdd);
        localStorage.setItem("shoppingBasket", JSON.stringify(updatedBasket));
      }
    } else {
      console.error("Product not found in allProducts");
    }
  };

  /* Delete button */
  const deleteFromBasket = (productId) => {
    const updatedBasket = basket.filter((product) => product._id !== productId);
    setBasket(updatedBasket);
    localStorage.setItem("shoppingBasket", JSON.stringify(updatedBasket));
    getBasket();
  };

  /* Get items from basket */
  const getBasket = () => {
    const basketData = localStorage.getItem("shoppingBasket");
    const basketArray = JSON.parse(basketData);
    if (!basketData) {
      setBasket([]);
    } else setBasket(basketArray);
  };
  console.log("basket local storage==>", basket);

  /* quantity button plus*/
  const quantityIncrease = (productId) => {
    const updatedBasket = basket.map((product) => {
      if (product._id === productId) {
        if (product.basketQuantity < product.quantity) {
          return {
            ...product,
            basketQuantity: product.basketQuantity + 1,
          };
        }
      }
      return product;
    });
    localStorage.setItem("shoppingBasket", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  /* quantity button minus*/
  const quantityDecrease = (productId) => {
    const updatedBasket = basket.map((product) => {
      if (product._id === productId) {
        if (product.basketQuantity > 1) {
          return {
            ...product,
            basketQuantity: product.basketQuantity - 1,
          };
        }
      }
      return product;
    });
    localStorage.setItem("shoppingBasket", JSON.stringify(updatedBasket));
    setBasket(updatedBasket);
  };

  //update product Quantites after purchase
  const updateProductsQuantities = (basket) => {
    const updatedQuantityProducts = basket.map((product) => {
      const updatedQuantity =
        parseInt(product.quantity) - parseInt(product.basketQuantity);

      const updatedProduct = {
        ...product,
        quantity: updatedQuantity.toString(),
      };

      delete updatedProduct.basketQuantity;
      return updatedProduct;
    });
    updateQuantites(updatedQuantityProducts);

    return updatedQuantityProducts;

    /* Remove the entire basket from local storage
       localStorage.removeItem("basket"); */
  };

  useEffect(() => {
    getBasket();
  }, []);

  return (
    <ProductContext.Provider
      value={{
        allProducts,
        selectedProduct,
        errors,
        basket,
        quantityIncrease,
        quantityDecrease,
        deleteProduct,
        addProduct,
        updateProduct,
        findProduct,
        filterProductsByCategory,
        addToBasket,
        deleteFromBasket,
        getBasket,
        filterProductsByPrice,
        getAllProducts,
        updateProductsQuantities,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export default ProductContextProvider;
