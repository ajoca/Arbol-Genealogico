import React, { useContext, useState } from "react";
import ArbolContext from "../context/ArbolContext";

const Busqueda = () => {
  const { arbol } = useContext(ArbolContext);
  const [nombre, setNombre] = useState("");
  const [resultado, setResultado] = useState("");

  const determinarParentesco = (nodo, nombreBuscado, parentesco = "Principal") => {
    if (nodo.nombre.toLowerCase() === nombreBuscado.toLowerCase()) {
      return parentesco;
    }
    for (let hijo of nodo.hijos) {
      const resultado = determinarParentesco(
        hijo,
        nombreBuscado,
        `Hijo de ${nodo.nombre}`
      );
      if (resultado) return resultado;
    }
    return null;
  };

  const handleBuscar = () => {
    if (!arbol) {
      setResultado("El árbol genealógico está vacío. Agrega familiares primero.");
      return;
    }
    if (!nombre.trim()) {
      setResultado("Por favor, ingresa un nombre válido.");
      return;
    }
    const parentesco = determinarParentesco(arbol, nombre);
    setResultado(parentesco || `No se encontró al familiar con el nombre "${nombre}".`);
  };

  return (
    <div className="buscador p-3 bg-light rounded shadow-sm">
      <div className="mb-3">
        <label>Nombre del Familiar:</label>
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          className="form-control"
          placeholder="Ingresa el nombre del familiar"
        />
      </div>
      <button onClick={handleBuscar} className="btn btn-primary w-100">
        Buscar
      </button>
      {resultado && <p className="mt-3"><strong>Resultado:</strong> {resultado}</p>}
    </div>
  );
};

export default Busqueda;
