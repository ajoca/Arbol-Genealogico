import React, { useState, useContext } from "react";
import ArbolContext from "../context/ArbolContext";

const FamiliaForm = () => {
  const { arbol, agregarFamiliar } = useContext(ArbolContext);
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState("");
  const [grado, setGrado] = useState(1);
  const [padreNombre, setPadreNombre] = useState("");
  const [esAncestro, setEsAncestro] = useState(false);

  const manejarEnvio = (e) => {
    e.preventDefault();

    if (!nombre || !edad || edad <= 0) {
      alert("Por favor, complete todos los campos correctamente.");
      return;
    }

    const nuevoFamiliar = {
      nombre,
      edad: parseInt(edad),
    };

    // Si es ancestro, pasar null como padreNombre
    agregarFamiliar(nuevoFamiliar, esAncestro ? null : padreNombre, esAncestro, grado);

    setNombre("");
    setEdad("");
    setPadreNombre("");
    setGrado(1);
    setEsAncestro(false);
  };

  const renderOpciones = (nodo) => {
    if (!nodo) return null;
    return (
      <>
        <option value={nodo.nombre}>{nodo.nombre}</option>
        {nodo.hijos.map((hijo) => renderOpciones(hijo))}
      </>
    );
  };

  return (
    <form onSubmit={manejarEnvio} className="p-3 bg-light rounded shadow-sm">
      <div className="mb-3">
        <label>Nombre:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
          required
        />
      </div>
      <div className="mb-3">
        <label>Edad:</label>
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          className="form-control"
          min="1"
          required
        />
      </div>
      <div className="mb-3">
        <label>Grado:</label>
        <input
          type="number"
          value={grado}
          onChange={(e) => setGrado(parseInt(e.target.value))}
          className="form-control"
          min="1"
        />
      </div>
      <div className="mb-3">
        <label>Seleccionar Padre:</label>
        <select
          value={padreNombre}
          onChange={(e) => setPadreNombre(e.target.value)}
          className="form-control"
          disabled={esAncestro} // Deshabilitar si es ancestro
        >
          <option value="">Ninguno (Usuario Principal)</option>
          {arbol && renderOpciones(arbol)}
        </select>
      </div>
      <div className="mb-3">
        <label>¿Es Ancestro?</label>
        <div className="form-check">
          <input
            type="checkbox"
            checked={esAncestro}
            onChange={() => setEsAncestro(!esAncestro)}
            className="form-check-input"
          />
          <label className="form-check-label">Marcar si es ancestro</label>
        </div>
      </div>
      <button type="submit" className="btn btn-primary w-100">
        Agregar Familiar
      </button>
    </form>
  );
};

export default FamiliaForm;
