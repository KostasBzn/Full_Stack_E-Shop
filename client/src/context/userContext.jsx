import { createContext, useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../config/axios-auth.js";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState();
  const [errors, setErrors] = useState(null);

  const navigate = useNavigate();

  const baseURL = import.meta.env.VITE_BASE_URL;

  const signUp = async (username, email, password) => {
    setErrors(null);
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

  const signIn = async (email, password) => {
    setErrors(null);
    try {
      const response = await axios.post(baseURL + `/users/signin`, {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      if (response.data.success) {
        setUser(response.data.user);

        //navigate("/home");
        window.location.replace("/home");
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

  //den to xreiazomai auto na svistei sto telos
  const findUser = async (userId) => {
    try {
      const response = await axios.get(baseURL + `/users/${userId}`);

      if (response.data.success) {
        setUser(response.data.user);
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
        loggedUser();
        //navigate("/app");
        console.log("User updated successfully!", response.data.user);
      } else {
        console.error("Error updating the user", response.data.message);
      }
    } catch (error) {
      console.error("Error updating the user", error.message);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(baseURL + `/users/delete/${userId}`);
      localStorage.removeItem("token");
      navigate("/");
      console.log("User deleted:", response.data.message);
    } catch (error) {
      console.log(error);
    }
  };

  const forgotPass = async (email) => {
    try {
      const response = await axios.post(baseURL + `/users/forgotpass`, {
        email,
      });

      if (response.data.success) {
        setErrors(null);
        alert(
          "Check your email to find the next step, to change your password"
        );
        navigate("/signin");
      }
    } catch (error) {
      console.error("Error finding the user", error.message);
      const err = [
        {
          message: error.response.data.error,
        },
      ];
      setErrors(err);
    }
  };

  const changePass = async (password, token) => {
    try {
      const response = await axios.patch(baseURL + "/users/changepass", {
        password,
        token,
      });

      if (response.data.success) {
        alert(
          "Your password changed successfully. Soon you will be redirected to the login page"
        );

        setTimeout(() => {
          navigate("/signin"); // redirect to login
        }, 2000);
      }
    } catch (error) {
      console.error("Error changin the password", error);
    }
  };

  //logged user
  const loggedUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const response = await axios.get(baseURL + `/users/loggeduser`);
        setUser(response.data.user);
        console.log("Fetched user:", response.data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setUser(null);
      }
    }
  };
  useEffect(() => {
    loggedUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        updatedUser,
        errors,
        signUp,
        signIn,
        logout,
        updateUser,
        deleteUser,
        forgotPass,
        changePass,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
