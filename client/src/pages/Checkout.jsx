import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../context/productContext";
import { UserContext } from "../context/userContext";

const Checkout = () => {
  const { basket, updateProductsQuantities } = useContext(ProductContext);
  const { user } = useContext(UserContext);

  const [selectedShipping, setSelectedShipping] = useState("dhl");
  const [shippingCost, setShippingCost] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [creditExpiry, setCreditExpiry] = useState("");
  const [creditCvc, setCreditCvc] = useState("");
  const [billigAddress, setBilligAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  useEffect(() => {
    if (user) {
      setUserEmail(user.email);
    }
  }, [user]);

  const handleUserEmail = (e) => {
    setUserEmail(e.target.value);
  };

  const handleCardHolder = (e) => {
    setCardHolder(e.target.value);
  };

  const handleCardNumber = (e) => {
    setCardNumber(e.target.value);
  };

  const handleCreditExpiry = (e) => {
    setCreditExpiry(e.target.value);
  };

  const handleCreditCvc = (e) => {
    setCreditCvc(e.target.value);
  };

  const handleBilligAddress = (e) => {
    setBilligAddress(e.target.value);
  };

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const handleZip = (e) => {
    setZip(e.target.value);
  };

  const handleShippingChange = (e) => {
    setSelectedShipping(e.target.value);
  };
  const totalSum = basket.reduce(
    (sum, product) => sum + product.price * product.basketQuantity,
    0
  );

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    updateProductsQuantities(basket);

    console.log("Shipping method=>>", selectedShipping);
    console.log("User email=>>", userEmail);
  };

  useEffect(() => {
    if (selectedShipping === "dhl") {
      return setShippingCost(4.5);
    } else if (selectedShipping === "ups") {
      return setShippingCost(3.5);
    }
  }, [selectedShipping]);

  return (
    <>
      <div
        className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32
      my-5"
      >
        <div className="px-4 pt-8">
          <p className="text-xl font-medium"> Address Information</p>
          <p className="text-gray-400">
            Check your address. And select a suitable shipping method.
          </p>
          {/* Address shipping */}
          <div className="w-1/2  py-4 justify-left w-full">
            {user?.address ? (
              // Render user's address if available
              <div className="bg-gray-100 p-10 rounded-md shadow-md">
                <p className="mb-3">
                  <b>Name:</b> {user.address.firstname} {user.address.lastname}
                </p>
                <p className="mb-3">
                  <b>Street:</b> {user.address.street}
                </p>
                <p className="mb-3">
                  <b>City:</b> {user.address.city}
                </p>
                <p className="mb-3">
                  <b>Postal code:</b> {user.address.postalCode}
                </p>
                <p>
                  <b>Country:</b> {user.address.country}
                </p>
              </div>
            ) : (
              // Render message if no address is added
              <p>No address added yet.</p>
            )}
          </div>
          {/* Shipping methods */}
          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          <form className="mt-5 grid gap-6">
            <div className="relative">
              <input
                type="radio"
                id="radio_fedex"
                name="shipping"
                value="ups"
                checked={selectedShipping === "ups"}
                onChange={handleShippingChange}
                className="peer hidden"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                htmlFor="radio_fedex"
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/naorrAeygcJzX0SyNI4Y0.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">DHL</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 2-4 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                type="radio"
                id="radio_other"
                name="shipping"
                value="dhl"
                checked={selectedShipping === "dhl"}
                onChange={handleShippingChange}
                className="peer hidden"
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                htmlFor="radio_other"
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
              >
                <img
                  className="w-14 object-contain"
                  src="/images/oG8xsl3xsOkwkMsrLGKM4.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">UPS</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 3-5 Days
                  </p>
                </div>
              </label>
            </div>
          </form>
        </div>
        <form
          onSubmit={handlePlaceOrder}
          className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0"
        >
          <p className="text-xl font-medium">Payment Details</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <label
              htmlFor="email"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Email
            </label>
            <div className="relative">
              <input
                type="text"
                id="email"
                value={userEmail}
                onChange={handleUserEmail}
                name="email"
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="your.email@gmail.com"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-holder"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Holder
            </label>
            <div className="relative">
              <input
                type="text"
                id="card-holder"
                name="card-holder"
                value={cardHolder}
                onChange={handleCardHolder}
                className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm uppercase shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="Your full name here"
              />
              <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z"
                  />
                </svg>
              </div>
            </div>
            <label
              htmlFor="card-no"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Card Details
            </label>
            <div className="flex">
              <div className="relative w-7/12 flex-shrink-0">
                <input
                  type="text"
                  id="card-no"
                  name="card-no"
                  value={cardNumber}
                  onChange={handleCardNumber}
                  className="w-full rounded-md border border-gray-200 px-2 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="xxxx-xxxx-xxxx-xxxx"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <svg
                    className="h-4 w-4 text-gray-400"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M11 5.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1z" />
                    <path d="M2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H2zm13 2v5H1V4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1zm-1 9H2a1 1 0 0 1-1-1v-1h14v1a1 1 0 0 1-1 1z" />
                  </svg>
                </div>
              </div>
              <input
                type="text"
                name="credit-expiry"
                value={creditExpiry}
                onChange={handleCreditExpiry}
                className="w-full rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="MM/YY"
              />
              <input
                type="text"
                name="credit-cvc"
                value={creditCvc}
                onChange={handleCreditCvc}
                className="w-1/6 flex-shrink-0 rounded-md border border-gray-200 px-2 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="CVC"
              />
            </div>
            <label
              htmlFor="billing-address"
              className="mt-4 mb-2 block text-sm font-medium"
            >
              Billing Address
            </label>
            <div className="flex flex-col sm:flex-row">
              <div className="relative flex-shrink-0 sm:w-7/12">
                <input
                  type="text"
                  id="billing-address"
                  name="billing-address"
                  value={billigAddress}
                  onChange={handleBilligAddress}
                  className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                  placeholder="Street Address"
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                  <p className="h-4 w-4 object-contain flex text-gray-400">
                    <i className="fa-solid fa-location-dot"></i>
                  </p>
                </div>
              </div>
              <input
                type="text"
                name="billing-city"
                value={city}
                onChange={handleCity}
                className="w-full rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="City"
              />

              <input
                type="text"
                name="billing-zip"
                value={zip}
                onChange={handleZip}
                className="flex-shrink-0 rounded-md border border-gray-200 px-4 py-3 text-sm shadow-sm outline-none sm:w-1/6 focus:z-10 focus:border-blue-500 focus:ring-blue-500"
                placeholder="ZIP"
              />
            </div>

            {/* Total */}
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">
                  {" "}
                  € {totalSum.toFixed(2)}
                </p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                {shippingCost ? (
                  <p className="font-semibold text-gray-900">
                    € {shippingCost}
                  </p>
                ) : (
                  "-"
                )}
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                € {(totalSum + shippingCost).toFixed(2)}
              </p>
            </div>
          </div>
          <button
            className="mt-4 mb-6 w-full inline-flex items-center justify-center px-6 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:flex-shrink-0"
            type="submit"
          >
            Place Order
          </button>
        </form>
      </div>
    </>
  );
};

export default Checkout;
