import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { useContext } from "react";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import { UserContext } from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && <Navbar />}
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<SignUp />} />
      </Routes>
      {user && <Footer />}
    </>
  );
}

export default App;
