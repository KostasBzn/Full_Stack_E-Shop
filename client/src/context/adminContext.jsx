import { createContext, useEffect } from "react";
import { useState } from "react";
import axios from "../config/axios-auth";
import { useNavigate } from "react-router-dom";

export const AdminContext = createContext();

const AdminContextProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const signUp = async (username, password) => {
    setErrors(null);
    try {
      const response = await axios.post(baseURL + `/admins/registeradmin`, {
        username,
        password,
      });

      if (response.data.success) {
        navigate("/admin");
        console.log("New Admin==>>", response.data.newAdmin);
      }
      setErrors(null);
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

  const signIn = async (username, password) => {
    setErrors(null);
    try {
      const response = await axios.post(baseURL + `/admins/signinadmin`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.success) {
        setAdmin(response.data.admin);
        navigate("/admin/dashboard");
      }
      setErrors(null);
      //window.location.replace("/home");
    } catch (error) {
      console.error("Error", error);

      const err = [
        {
          message: error.response.data.error,
        },
      ];
      setErrors(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const deleteUser = async (adminId) => {
    try {
      const response = await axios.delete(
        baseURL + `/admins/deleteadmin/${adminId}`
      );
      localStorage.removeItem("token");
      navigate("/");
      console.log("Admin deleted:", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loggedAdmin = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(baseURL + `/admins/loggedadmin`);
          setAdmin(response.data.admin);
          //console.log("Fetched admin:", response.data);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          setAdmin(null);
        }
      }
    };

    loggedAdmin();
  }, []);

  return (
    <AdminContext.Provider value={{ signIn, signUp, logout, admin, errors }}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContextProvider;
