import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/productContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const { basket } = useContext(ProductContext);

  const baseURL = import.meta.env.VITE_BASE_URL;

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const basketTotalQuantity = basket?.reduce(
    (total, product) => total + product?.basketQuantity,
    0
  );

  return (
    <>
      <nav className="bg-customColor1 flex justify-between items-center px-6 py-3">
        <div className="flex gap-5 items-center">
          <button
            className="rounded-full overflow-hidden "
            onClick={toggleDropdown}
          >
            {user.image ? (
              <img
                src={baseURL + "/uploads/prfim/" + user.image}
                className="w-12 h-12 bg-gray-300 object-cover"
                alt="Profile img"
                style={{ borderRadius: "50%" }}
              />
            ) : (
              <img
                src="../public/tree-736885_1280.jpg"
                alt="profpic"
                className="w-12 h-12 bg-gray-300 object-cover"
                style={{ borderRadius: "50%" }}
              />
            )}
          </button>
          {isDropdownOpen && (
            <div className="absolute  left-10 top-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              <Link
                onClick={toggleDropdown}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                to="/home"
              >
                Home
              </Link>
              <Link
                onClick={toggleDropdown}
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                to="/userprofile"
              >
                Profile
              </Link>
              <button
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
          <p
            className="ml-2 text-white font-bold
"
          >
            {user.username}
          </p>
        </div>
        <div className="flex items-center">
          <div className="mr-4 cursor-pointer hover:text-gray-300">
            <Link to={"/shoppingbasket"}>
              <i className="fa-solid fa-cart-shopping text-white"></i>
            </Link>
          </div>
          <p className="text-white font-300">
            ({basketTotalQuantity !== undefined ? basketTotalQuantity : "0"})
          </p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
