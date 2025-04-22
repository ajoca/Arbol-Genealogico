import React, { useContext, useState } from "react";
import ArbolContext from "../context/ArbolContext";
import Tree from "react-d3-tree";

const Visualizacion = () => {
  const { arbol, visualizarPorProfundidad } = useContext(ArbolContext);
  const [limiteProfundidad, setLimiteProfundidad] = useState("");

  // Convertir nodo a formato compatible con react-d3-tree
  const convertirNodoAD3Tree = (nodo) => {
    const color = nodo.fallecido
      ? "red"
      : nodo.confirmado
      ? "green"
      : "orange";

    return {
      name: `${nodo.nombre} (${nodo.edad} años)`,
      attributes: {
        Confirmado: nodo.confirmado ? "Sí" : "No",
        Fallecido: nodo.fallecido ? "Sí" : "No",
      },
      children: nodo.hijos?.map(convertirNodoAD3Tree) || [],
      nodeSvgShape: {
        shape: "circle",
        shapeProps: { r: 10, fill: color },
      },
    };
  };

  // Obtener datos según límite de profundidad
  const obtenerDataArbol = () => {
    const profundidad = parseInt(limiteProfundidad, 10);
    const arbolFiltrado =
      profundidad > 0 ? visualizarPorProfundidad(profundidad) : arbol;
    return [convertirNodoAD3Tree(arbolFiltrado)];
  };

  const manejarCambioProfundidad = (e) => {
    setLimiteProfundidad(e.target.value);
  };

  const data = arbol ? obtenerDataArbol() : [];

  return (
    <div className="visualizacion-container">
      <div className="control-panel mb-3">
        <label>Profundidad a Visualizar:</label>
        <input
          type="number"
          value={limiteProfundidad}
          onChange={manejarCambioProfundidad}
          placeholder="Todos los niveles"
          className="form-control"
          min="0"
        />
      </div>
      <div
        id="treeWrapper"
        style={{ width: "100%", height: "100vh", overflow: "auto" }}
      >
        {data.length > 0 && (
          <Tree
            data={data}
            translate={{ x: 400, y: 100 }}
            orientation="vertical"
            pathFunc="curve"
            nodeSize={{ x: 200, y: 100 }}
            separation={{ siblings: 1.5, nonSiblings: 2 }}
            zoomable
            scaleExtent={{ min: 0.5, max: 2 }}
            draggable
          />
        )}
      </div>
    </div>
  );
};

export default Visualizacion;
