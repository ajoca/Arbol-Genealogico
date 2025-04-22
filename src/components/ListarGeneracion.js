import React, { useState, useContext, useEffect } from "react";
import ArbolContext from "../context/ArbolContext";

const ListarGeneracion = () => {
  const { listarFamiliaPorGeneracionYEdad } = useContext(ArbolContext);
  const [generacion, setGeneracion] = useState(0);
  const [familiares, setFamiliares] = useState([]);

  
  useEffect(() => {
    if (generacion >= 0) {
      actualizarFamiliares(generacion);
    } else {
      // Si la generación es menor que 0, limpiar la lista de familiares
      setFamiliares([]);
    }
  }, [generacion]);

  
  const actualizarFamiliares = (nuevaGeneracion) => {
    
    setFamiliares([]);

    // Esperar a que el estado se limpie antes de agregar nuevos elementos
    setTimeout(() => {
      const nuevosFamiliares = listarFamiliaPorGeneracionYEdad(nuevaGeneracion);
      setFamiliares(nuevosFamiliares);
    }, 0);
  };

  
  const manejarCambioGeneracion = (e) => {
    const nuevaGeneracion = parseInt(e.target.value);
    setGeneracion(nuevaGeneracion);
  };

  return (
    <div className="card p-4 shadow-sm mt-4">

      <label>Seleccionar Generación:</label>
      <input
        type="number"
        value={generacion}
        onChange={manejarCambioGeneracion}
        className="form-control"
        min="0"
      />
      <ul className="mt-3">
        {familiares.length > 0 ? (
          familiares.map((familiar) => (
            <li key={`${familiar.nombre}-${familiar.grado}`}>
              {familiar.nombre} ({familiar.edad} años)
            </li>
          ))
        ) : (
          <li className="text-muted">No hay familiares en esta generación.</li>
        )}
      </ul>
    </div>
  );
};

export default ListarGeneracion;
