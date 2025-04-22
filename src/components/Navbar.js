import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ArbolContext from "../context/ArbolContext";
import AuthContext from "../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "../App.css";

const Navbar = () => {
  const { reiniciarArbol } = useContext(ArbolContext);
  const { usuarioActual, cerrarSesion } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleReiniciar = () => {
    if (window.confirm("¿Estás seguro de que deseas reiniciar el árbol?")) {
      reiniciarArbol();
    }
  };

  const handleCerrarSesion = () => {
    cerrarSesion();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <Link className="navbar-brand text-white d-flex align-items-center" to="/">
          <img
            src={`${process.env.PUBLIC_URL}/pngwing.com.png`}
            alt="Logo"
            style={{ width: "40px", height: "40px", marginRight: "10px" }}
          />
          Árbol Genealógico
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            {!usuarioActual && (
              <>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/registro">
                    Registro
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link text-white" to="/login">
                    Login
                  </Link>
                </li>
              </>
            )}
          </ul>
          {usuarioActual && (
            <div className="d-flex align-items-center">
              <span className="text-white me-3">
                Hola, <strong>{usuarioActual.nombre}</strong>
              </span>
              <button
                className="btn btn-danger me-2"
                onClick={handleReiniciar}
              >
                Reiniciar Árbol
              </button>
              <button
                className="btn btn-outline-light"
                onClick={handleCerrarSesion}
              >
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
