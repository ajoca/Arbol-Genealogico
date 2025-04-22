import React, { useState, useContext } from "react";
import ArbolContext from "../context/ArbolContext";

const BusquedaParentesco = () => {
  const { buscarParentesco, arbol } = useContext(ArbolContext);
  const [nombre1, setNombre1] = useState("");
  const [nombre2, setNombre2] = useState("");
  const [resultado, setResultado] = useState("");

  const manejarBusqueda = () => {
    if (!arbol) {
      setResultado("El árbol genealógico está vacío. Agrega familiares primero.");
      return;
    }
    if (!nombre1.trim() || !nombre2.trim()) {
      setResultado("Por favor, completa ambos nombres para buscar el parentesco.");
      return;
    }
    const parentesco = buscarParentesco(nombre1, nombre2);
    setResultado(parentesco);
  };

  return (
    <div className="busqueda p-3 bg-light rounded shadow-sm">
      <div className="mb-3">
        <label>Primer Nombre:</label>
        <input
          type="text"
          value={nombre1}
          onChange={(e) => setNombre1(e.target.value)}
          className="form-control"
          placeholder="Ingresa el primer nombre"
        />
      </div>
      <div className="mb-3">
        <label>Segundo Nombre:</label>
        <input
          type="text"
          value={nombre2}
          onChange={(e) => setNombre2(e.target.value)}
          className="form-control"
          placeholder="Ingresa el segundo nombre"
        />
      </div>
      <button onClick={manejarBusqueda} className="btn btn-primary w-100">
        Buscar Parentesco
      </button>
      {resultado && <p className="mt-3"><strong>Resultado:</strong> {resultado}</p>}
    </div>
  );
};

export default BusquedaParentesco;
