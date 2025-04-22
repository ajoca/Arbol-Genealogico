import React, { useContext } from "react";
import ArbolContext from "../context/ArbolContext";

const ListadoFamilia = () => {
  const {
    arbol,
    confirmarFamiliar,
    confirmarFallecimiento,
    familiaresPendientesConfirmacion,
  } = useContext(ArbolContext);

  const renderAntecesores = (antecesores) => {
    if (!antecesores || antecesores.length === 0) {
      return <p className="text-muted">No hay antecesores registrados.</p>;
    }
  
    return (
      <ul className="list-group mt-3">
        {antecesores.map((antecesor) => (
          <li key={antecesor.nombre} className="list-group-item">
            <strong>{antecesor.nombre}</strong> ({antecesor.edad} años){" "}
            {antecesor.requiereConfirmacion && (
              <span className="text-warning">
                - Pendiente de confirmación
              </span>
            )}{" "}
            {antecesor.fallecido && <span className="text-danger">(Fallecido)</span>}
          </li>
        ))}
      </ul>
    );
  };
  

  // Renderizar familiares con recursividad
  const renderFamiliares = (nodo) => {
    if (!nodo) return null;

    return (
      <li key={nodo.nombre} className="list-group-item p-3">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{nodo.nombre}</strong> ({nodo.edad} años) -{" "}
            <span className="text-muted">Grado: {nodo.grado || 0}</span>{" "}
            {nodo.fallecido && <span className="text-danger">(Fallecido)</span>}
          </div>
          <div>
            {!nodo.fallecido && nodo.confirmacionesFallecimiento < 3 && (
              <button
                className="btn btn-danger btn-sm w-100 py-1 px-2"
                style={{ maxWidth: "150px" }}
                onClick={() => confirmarFallecimiento(nodo.nombre)}
              >
                Confirmar Fallecimiento
              </button>
            )}
          </div>
        </div>
        {nodo.hijos && nodo.hijos.length > 0 && (
          <ul className="list-group list-group-flush ms-4 mt-3">
            {nodo.hijos.map((hijo) => renderFamiliares(hijo))}
          </ul>
        )}
      </li>
    );
  };

  // Renderizar pendientes de confirmación
  const renderPendientesConfirmacion = () => {
    const pendientes = familiaresPendientesConfirmacion();
    if (!pendientes || pendientes.length === 0) {
      return <p className="text-muted">No hay familiares pendientes de confirmación.</p>;
    }

    return pendientes.map((nodo) => (
      <li key={nodo.nombre} className="list-group-item p-3 bg-warning-subtle">
        <div className="d-flex justify-content-between align-items-center">
          <div>
            <strong>{nodo.nombre}</strong> ({nodo.edad} años) -{" "}
            <span className="text-muted">Grado: {nodo.grado || 0}</span>{" "}
            <span className="text-warning">
              {nodo.edad < 18
                ? "(Menor de edad, requiere confirmación)"
                : "(Mayor de edad, requiere invitación)"}
            </span>
          </div>
          <div>
            <button
              className="btn btn-success btn-sm w-100 py-1 px-2"
              style={{ maxWidth: "150px" }}
              onClick={() => confirmarFamiliar(nodo.nombre)}
            >
              Confirmar Registro
            </button>
          </div>
        </div>
      </li>
    ));
  };

  if (!arbol) {
    return <p className="text-center text-secondary">Cargando árbol genealógico...</p>;
  }

  return (
    <div
      className="listado p-3 bg-light rounded shadow-sm"
      style={{ maxWidth: "600px", margin: "0 auto" }}
    >
      <h4 className="text-secondary mb-3">Antecesores</h4>
      {renderAntecesores(arbol)}
      <h4 className="text-secondary mb-3">Familiares Confirmados</h4>
      <ul className="list-group" style={{ overflowX: "auto" }}>
        {renderFamiliares(arbol)}
      </ul>
      <h4 className="text-secondary mt-4 mb-3">Pendientes de Confirmación</h4>
      <ul className="list-group" style={{ overflowX: "auto" }}>
        {renderPendientesConfirmacion()}
      </ul>
    </div>
  );
};

export default ListadoFamilia;
