import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import UserContextProvider from "./context/userContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  const user = null;

  return (
    <>
      <BrowserRouter>
        <UserContextProvider>
          {user && <Navbar />}
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/" element={<SignUp />} />
          </Routes>
          {user && <Footer />}
        </UserContextProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
