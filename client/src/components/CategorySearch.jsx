import { useContext, useState } from "react";
import { ProductContext } from "../context/productContext";

const CategorySearch = () => {
  const { filterProductsByCategory } = useContext(ProductContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    filterProductsByCategory(category);
    //console.log(category);
  };

  const handleSearch = () => {
    console.log("Min Price:", minPrice);
    console.log("Max Price:", maxPrice);
  };
  return (
    <>
      <div className="relative ">
        <button
          onClick={toggleDropdown}
          className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
          type="button"
        >
          Filter products
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
          <div>
            <div className="  top-full z-2 w-56 p-3 bg-white rounded-t-lg shadow dark:bg-gray-700 border-b">
              <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                Price
              </h6>
              <div className="flex items-center gap-2">
                <div className="flex space-x-2 ">
                  <input
                    type="text"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border rounded-md"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="border-gray-300 focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border rounded-md"
                    required
                  />
                </div>
                <button
                  onClick={handleSearch}
                  className=" py- px-1 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-700 focus:outline-none  "
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
            <div className="  top-full z-2 w-56 p-3 bg-white rounded-lg shadow dark:bg-gray-700 ">
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
          </div>
        )}
      </div>
    </>
  );
};

export default CategorySearch;
