import React, { useContext, useState } from "react";
import { UserContext } from "../context/userContext";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { user, logout } = useContext(UserContext);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <>
      <nav className="bg-customColor1 flex justify-between items-center px-6 py-3">
        <div className="flex gap-5 items-center">
          <button
            className="rounded-full overflow-hidden"
            onClick={toggleDropdown}
          >
            <img
              src=""
              alt="profpic"
              className="w-10 h-10 object-cover"
              style={{ borderRadius: "50%" }}
            />
          </button>
          {isDropdownOpen && (
            <div className="absolute left-10 top-10 mt-2 w-48 bg-white rounded-md shadow-lg">
              <button
                className="block px-4 py-2 text-sm text-gray-700 w-full text-left"
                onClick={toggleDropdown}
              >
                Profile
              </button>
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
            <i className="fa-solid fa-cart-shopping text-white"></i>
          </div>
          <p className="text-white font-300">{2}</p>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
