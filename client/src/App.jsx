import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import EmailConfirm from "./pages/EmailConfirm";
import ConfirmedUser from "./pages/ConfirmedUser";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        {user && <Route path="/home" element={<Home />} />}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
        <Route path="/emailconfirm/:token" element={<EmailConfirm />} />
        <Route path="/confirmeduser" element={<ConfirmedUser />} />
      </Routes>
      {user && <Footer />}
    </>
  );
}

export default App;
