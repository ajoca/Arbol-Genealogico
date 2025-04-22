import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ArbolProvider } from "./context/ArbolContext"; 
import Registro from "./pages/Registro";
import Login from "./pages/Login";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider>
      <ArbolProvider> {}
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to="/registro" />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/login" element={<Login />} />
            <Route path="/app" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ArbolProvider>
    </AuthProvider>
  </React.StrictMode>
);
