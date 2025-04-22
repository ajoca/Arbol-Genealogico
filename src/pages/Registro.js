import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const RegistroUsuario = () => {
  const { registrarUsuario } = useContext(AuthContext);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [correo, setCorreo] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();

  const manejarRegistro = (e) => {
    e.preventDefault();

    if (!nombre || !edad || !correo || !contraseña) {
      alert("Por favor, complete todos los campos.");
      return;
    }
    if (edad <= 0) {
      alert("La edad debe ser un número positivo.");
      return;
    }

    const usuario = {
      nombre,
      edad: parseInt(edad),
      correo,
      contraseña,
    };

    if (registrarUsuario(usuario)) {
      alert("Usuario registrado exitosamente.");
      navigate("/login");
    } else {
      alert("El correo ya está registrado.");
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
              <form onSubmit={manejarRegistro}>
                <div className="mb-4">
                  <label className="form-label fw-bold">Nombre</label>
                  <input
                    type="text"
                    className="form-control"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    placeholder="Ingresa tu nombre"
                    required
                  />
                </div>
                <div className="mb-4">
                  <label className="form-label fw-bold">Edad</label>
                  <input
                    type="number"
                    className="form-control"
                    value={edad}
                    onChange={(e) => setEdad(e.target.value)}
                    placeholder="Ingresa tu edad"
                    min="1"
                    required
                  />
                </div>
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
                    placeholder="Ingresa tu contraseña"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg w-100 shadow-sm"
                >
                  Registrarse
                </button>
              </form>
            </div>
            <div className="card-footer text-center py-3">
              <small className="text-muted">
                ¿Ya tienes una cuenta?{" "}
                <span
                  className="text-primary fw-bold"
                  style={{ cursor: "pointer" }}
                  onClick={() => navigate("/login")}
                >
                  Inicia Sesión
                </span>
              </small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistroUsuario;
