import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AdminContext } from "../context/adminContext";

const AdminNavbar = () => {
  const { admin, logout } = useContext(AdminContext);

  const handleLogout = () => {
    logout();
    console.log("Hello");
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
      <button
        onClick={handleLogout}
        className="bg-transparent font-bold text-white px-4 py-2 "
      >
        Logout <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
    </nav>
  );
};

export default AdminNavbar;
