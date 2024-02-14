import { useContext } from "react";
import { ProductContext } from "../context/productContext";
import { Link } from "react-router-dom";

const ShoppingBasket = () => {
  const baseURL = import.meta.env.VITE_BASE_URL;
  const { basket, deleteFromBasket, quantityIncrease, quantityDecrease } =
    useContext(ProductContext);

  const totalSum = basket?.reduce(
    (sum, product) => sum + product.price * product.basketQuantity,
    0
  );

  return (
    <>
      <div className="text-center py-4">
        <h2 className="text-3xl font-bold">Your shopping cart</h2>
      </div>
      <div className="flex justify-center flex-col items-center">
        <ul
          className="flex flex-col items-start space-y-4 mt-2 bg-customColor2 p-4 rounded-lg"
          style={{ width: "700px" }}
        >
          {basket?.map((product) => (
            <li
              key={product._id}
              className="flex items-center justify-between w-full px-4 py-2 bg-white shadow-md rounded-lg"
            >
              <div className="flex items-center gap-8">
                <img
                  src={baseURL + "/uploads/prdim/" + product.image}
                  alt={product.title}
                  className="w-12 h-12 object-cover"
                />

                <h4 className="ml-2 text-l font-medium text-stone-600">
                  {product.title}
                </h4>
              </div>

              <div className="flex items-center">
                <div className="mr-4 flex items-center gap-3 border border-gray-300 rounded-lg px-2 py-1 ">
                  <button
                    onClick={() => {
                      quantityDecrease(product._id);
                    }}
                    className="px-2 py-1 bg-transparent rounded-lg text-xs"
                  >
                    <i className="fa-solid fa-minus"></i>
                  </button>
                  <p className="text-base font-medium text-stone-500">
                    {product.basketQuantity}
                  </p>
                  <button
                    onClick={() => {
                      quantityIncrease(product._id);
                    }}
                    className="px-2 py-1 bg-transparent rounded-lg text-xs"
                  >
                    <i className="fa-solid fa-plus"></i>
                  </button>
                </div>

                <div className="flex items-center">
                  <p className="text-base font-medium text-gray-900">
                    {product.price} €
                  </p>
                  <span className="mx-2"></span>
                </div>
                <button
                  onClick={() => {
                    deleteFromBasket(product._id);
                  }}
                  className="ml-4 text-red-500"
                >
                  <i className="fa-solid fa-trash-can "></i>
                </button>
              </div>
            </li>
          ))}
        </ul>
        <div
          className="border border-gray-700 mt-5 mb-5"
          style={{ width: "400px", borderRadius: "8px" }}
        >
          <div className=" px-4 py-6 m-auto mt-6">
            <div className="flex justify-between text-base font-medium text-gray-900">
              <p>Subtotal</p>
              <p>{totalSum} €</p>
            </div>
            <p className="mt-2 text-sm text-gray-500 underline">
              Shipping and taxes calculated at checkout.
            </p>
          </div>
          <div className="mt-6 flex justify-center text-center">
            <a
              href="./checkout"
              className="inline-block bg-indigo-600 py-3 px-6 rounded-md text-base font-medium text-white shadow-sm hover:bg-indigo-700"
            >
              Checkout
            </a>
          </div>
          <div className="mt-6 mb-6 flex justify-center text-center text-sm text-gray-500">
            <p>
              or{" "}
              <Link
                to={"/home"}
                className="font-medium text-indigo-600 hover:text-indigo-500 underline"
              >
                Continue Shopping
                <span aria-hidden="true"> &rarr;</span>
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default ShoppingBasket;
