import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/adminContext";
import { ProductContext } from "../context/productContext";

const AdminNavbar = () => {
  const { admin, logout } = useContext(AdminContext);
  const { filterProductsByCategory } = useContext(ProductContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleLogout = () => {
    logout();
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProductsByCategory(category);
    //console.log(category);
  };

  return (
    <nav className="bg-gray-800 text-white flex justify-between items-center px-4 h-16">
      <div>
        {admin ? (
          <p>Welcome {admin.username}</p>
        ) : (
          <p>There is no admin logged</p>
        )}
      </div>
      <ul className="flex gap-10">
        <li>
          <Link to="/admin/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/admin/products" className="hover:text-gray-300">
            Products
          </Link>
        </li>
      </ul>
      <div className="relative">
        <button
          onClick={toggleDropdown}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Filter by category
          <svg
            className="w-4 h-4 ml-2"
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </button>
        {isDropdownOpen && (
          <div className="absolute inset-x-0 top-full z-10 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700">
            <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
              Category
            </h6>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center">
                <input
                  id="parts"
                  type="radio"
                  name="category"
                  value="parts"
                  checked={selectedCategory === "parts"}
                  onChange={() => handleCategoryChange("parts")}
                  className="mr-2"
                />
                <label
                  htmlFor="parts"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Parts
                </label>
              </li>
              <li className="flex items-center">
                <input
                  id="frames"
                  type="radio"
                  name="category"
                  value="frames"
                  checked={selectedCategory === "frames"}
                  onChange={() => handleCategoryChange("frames")}
                  className="mr-2"
                />
                <label
                  htmlFor="frames"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Frames
                </label>
              </li>
              <li className="flex items-center">
                <input
                  id="accessories"
                  type="radio"
                  name="category"
                  value="accessories"
                  checked={selectedCategory === "accessories"}
                  onChange={() => handleCategoryChange("accessories")}
                  className="mr-2"
                />
                <label
                  htmlFor="accessories"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Accessories
                </label>
              </li>
              <li className="flex items-center">
                <input
                  id="bikes"
                  type="radio"
                  name="category"
                  value="bikes"
                  checked={selectedCategory === "bikes"}
                  onChange={() => handleCategoryChange("bikes")}
                  className="mr-2"
                />
                <label
                  htmlFor="bikes"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  Bikes
                </label>
              </li>
              <li className="flex items-center">
                <input
                  id="empty"
                  type="radio"
                  name="category"
                  value="empty"
                  checked={selectedCategory === ""}
                  onChange={() => handleCategoryChange("")}
                  className="mr-2"
                />
                <label
                  htmlFor="bikes"
                  className="text-sm font-medium text-gray-900 dark:text-gray-100"
                >
                  All
                </label>
              </li>
            </ul>
          </div>
        )}
      </div>
      <button
        onClick={handleLogout}
        className="bg-transparent font-bold text-white px-4 py-2"
      >
        Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </nav>
  );
};

export default AdminNavbar;
