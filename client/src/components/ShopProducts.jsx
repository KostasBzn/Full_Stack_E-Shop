import { useContext, useState } from "react";
import { ProductContext } from "../context/productContext";
import { UserContext } from "../context/userContext";

const ShopProducts = () => {
  const { allProducts, addToBasket } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const handleAddToCart = (productId) => {
    addToBasket(productId);
    //console.log("Add to Cart product id:", productId);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {allProducts?.map((product) => (
        <div key={product._id} className="border rounded-md p-4">
          <img
            src={baseURL + "/uploads/prdim/" + product.image}
            alt={product.title}
            className="w-full h-60 object-cover mb-2"
          />
          <h3 className="text-lg font-bold mb-2">{product.title}</h3>
          <p className="text-sm mb-2">{product.description}</p>
          <p className="text-sm mb-2">
            <b>Price:</b> {product.price} €
          </p>
          <p
            className={`text-sm mb-2 ${
              product.quantity === 0
                ? "text-red-500"
                : product.quantity === 1
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {product.quantity === 0 ? (
              <b>Sold out</b>
            ) : product.quantity === 1 ? (
              <b>Last item left in stock</b>
            ) : (
              <b>Still {product.quantity} in stock</b>
            )}
          </p>

          <div className="flex justify-center my-4 space-x-4">
            <button
              onClick={() => {
                handleAddToCart(product._id);
              }}
              className="rounded w-1/2 px-2 py-3  border border-yellow-400 bg-gradient-to-b from-yellow-300 to-yellow-500"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShopProducts;
