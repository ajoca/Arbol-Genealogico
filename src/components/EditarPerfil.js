import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";

const EditarPerfil = () => {
  const { usuarioActual, editarPerfil } = useContext(AuthContext);
  const [nombre, setNombre] = useState(usuarioActual?.nombre || "");
  const [edad, setEdad] = useState(usuarioActual?.edad || "");
  const [correo, setCorreo] = useState(usuarioActual?.correo || "");

  const manejarEdicion = (e) => {
    e.preventDefault();

    // Validación básica
    if (!nombre || !edad || edad <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    // Actualizar perfil
    editarPerfil({ nombre, edad: parseInt(edad), correo });
    alert("Perfil actualizado exitosamente.");
  };

  return (
    <div className="container p-3 bg-light rounded shadow-sm">
      <h3 className="mb-3">Editar Perfil</h3>
      <form onSubmit={manejarEdicion}>
        <div className="mb-3">
          <label htmlFor="nombre" className="form-label">
            Nombre:
          </label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="edad" className="form-label">
            Edad:
          </label>
          <input
            type="number"
            id="edad"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            className="form-control"
            min="1"
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="correo" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            id="correo"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success w-100">
          Guardar Cambios
        </button>
      </form>
    </div>
  );
};

export default EditarPerfil;
