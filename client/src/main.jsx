import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import UserContextProvider from "./context/userContext.jsx";
import ProductContextProvider from "./context/productContext.jsx";
import AdminContextProvider from "./context/adminContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <UserContextProvider>
        <AdminContextProvider>
          <ProductContextProvider>
            <App />
          </ProductContextProvider>
        </AdminContextProvider>
      </UserContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
