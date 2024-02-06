import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios-auth.js";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState();

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const signUp = async (username, email, password) => {
    try {
      const response = await axios.post(baseURL + `/users/register`, {
        username,
        email,
        password,
      });

      if (response.data.success) {
        navigate("/signin");
        console.log("New User==>>", response.data.newUser);
      }

      //window.location.replace("/signedin");
      //window.location.reload();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const signIn = async (email, password) => {
    try {
      const response = await axios.post(baseURL + `/users/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.success) {
        setUser(response.data.user);
        navigate("/home");
      }

      //window.location.replace("/home");
    } catch (error) {
      console.error("Error", error);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.replace("/");
  };

  const findUser = async (userId) => {
    try {
      const response = await axios.get(baseURL + `/users/${userId}`);

      if (response.data.success) {
        setSelectedUser(response.data.user);
        console.log("User found successfully!", response.data.user);
      } else {
        console.error("User not found", error);
      }
    } catch (error) {
      console.error("Error finding the User", error.message);
    }
  };

  const updateUser = async (userId, updatedData) => {
    try {
      const response = await axios.put(
        baseURL + `/users/updateuser/${userId}`,
        updatedData
      );

      if (response.data.success) {
        setUpdatedUser(response.data.user);

        //navigate("/app");
        console.log("User updated successfully!", response.data.user);
      } else {
        console.error("Error updating the user", response.data.message);
      }
    } catch (error) {
      console.error("Error updating the user", error.message);
    }
  };

  useEffect(() => {
    const loggedUser = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(baseURL + `/users/loggeduser`);
          setUser(response.data.user);
          //console.log("Fetched user:", response.data);
        } catch (error) {
          console.error(error);
          localStorage.removeItem("token");
          setUser(null);
        }
      }
    };

    loggedUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updatedUser,
        signUp,
        signIn,
        logout,
        findUser,
        updateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
