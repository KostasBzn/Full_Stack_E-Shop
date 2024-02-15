import { useContext, useState } from "react";
import { ProductContext } from "../context/productContext";
import { UserContext } from "../context/userContext";

const ShopProducts = () => {
  const { allProducts, addToBasket, quantityAlert } =
    useContext(ProductContext);
  const { user } = useContext(UserContext);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const handleAddToCart = (productId) => {
    addToBasket(productId);
    //console.log("Add to Cart product id:", productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {allProducts?.map((product) => (
        <div
          key={product._id}
          className="bg-white rounded-md shadow-md p-4 flex flex-col space-y-4"
        >
          <img
            src={baseURL + "/uploads/prdim/" + product.image}
            alt={product.title}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
          <h3 className="text-lg font-bold text-gray-800">{product.title}</h3>
          <p className="text-sm text-gray-600 mb-2">{product.description}</p>
          <div className="flex items-center justify-between text-sm">
            <p className="font-bold text-gray-800">€ {product.price}</p>
            <p
              className={`text-green-500  ${
                product.quantity === "0" ? "text-red-500" : null
              } ${product.quantity === "1" ? "text-yellow-500" : null}`}
            >
              {product.quantity === "0" ? (
                <b>Sold out</b>
              ) : product.quantity === "1" ? (
                <b>Last item in stock</b>
              ) : (
                <b>Still {product.quantity} in stock</b>
              )}
            </p>
          </div>
          <button
            onClick={() => handleAddToCart(product._id)}
            className={`w-full px-4 py-2 text-center text-white rounded-md bg-yellow-500  transition-all duration-200 ${
              product.quantity === "0" ? "bg-amber-200" : "hover:bg-yellow-700"
            }`}
            disabled={product.quantity === "0"}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
