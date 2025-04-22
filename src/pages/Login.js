import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { iniciarSesion } = useContext(AuthContext);
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (iniciarSesion(correo, contraseña)) {
      alert("Inicio de sesión exitoso.");
      navigate("/app");
    } else {
      alert("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-5 col-md-7 col-sm-10">
          <div className="card shadow-lg border-0 rounded-lg">
            <div className="card-header bg-primary text-white text-center py-4">
             
            </div>
            <div className="card-body p-4">
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Correo Electrónico</label>
                  <input
                    type="email"
                    className="form-control"
                    value={correo}
                    onChange={(e) => setCorreo(e.target.value)}
                    placeholder="nombre@ejemplo.com"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Contraseña</label>
                  <input
                    type="password"
                    className="form-control"
                    value={contraseña}
                    onChange={(e) => setContraseña(e.target.value)}
                    placeholder="Contraseña"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 shadow-sm"
                >
                  Iniciar Sesión
                </button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">
                ¿No tienes una cuenta?{" "}
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/registro")}
                >
                  Regístrate
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
