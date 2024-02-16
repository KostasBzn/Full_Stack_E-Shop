import "./App.css";
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmailConfirm from "./pages/EmailConfirm";
import ConfirmedUser from "./pages/ConfirmedUser";
import UserProfile from "./pages/UserProfile";
import AddressUpdate from "./pages/AddressUpdtate";
import DeleteAccForm from "./pages/DeleteAccountForm";
import ForgotPass from "./pages/ForgotPass";
import ChangePass from "./pages/ChangePass";
import SignInAdmin from "./pages/Admin/SignInAdmin";
import SignUpAdmin from "./pages/Admin/SignUpAdmin";
import Dashboard from "./pages/Admin/Dashboard";
import Products from "./pages/Admin/Products";
import { AdminContext } from "./context/adminContext";
import AdminNavbar from "./components/AdminNavbar";
import EditProduct from "./pages/Admin/EditProductForm";

import Checkout from "./pages/Checkout";

function App() {
  const { user } = useContext(UserContext);
  const { admin } = useContext(AdminContext);

  return (
    <>
      {admin && !user && <AdminNavbar />}
      {user && !admin && <Navbar />}
      <Routes>
        {user && <Route path="/home" element={<Home />} />}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/confirmeduser" element={<ConfirmedUser />} />
        <Route path="/userprofile" element={<UserProfile />} />
        <Route path="/address" element={<AddressUpdate />} />
        <Route path="/deleteuser" element={<DeleteAccForm />} />
        <Route path="/forgotpass" element={<ForgotPass />} />
        <Route path="/changepass/:token" element={<ChangePass />} />
        <Route path="/admin" element={<SignInAdmin />} />
        <Route path="/signupadmin" element={<SignUpAdmin />} />
        <Route path="/admin" element={<SignInAdmin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/editproduct" element={<EditProduct />} />

        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      {user && !admin && <Footer />}
    </>
  );
}

export default App;
