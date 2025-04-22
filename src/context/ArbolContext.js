import React, { createContext, useState, useEffect, useContext } from "react";
import AuthContext from "./AuthContext";

const ArbolContext = createContext();

export const ArbolProvider = ({ children }) => {
  const { usuarioActual } = useContext(AuthContext);
  const [arbol, setArbol] = useState(null);

  useEffect(() => {
    if (usuarioActual) {
      const arbolInicial = {
        nombre: usuarioActual.nombre,
        edad: usuarioActual.edad,
        grado: 0,
        confirmado: true,
        fallecido: false,
        hijos: [],
        confirmacionesFallecimiento: 0,
      };

      const arbolAlmacenado = JSON.parse(
        localStorage.getItem(`arbolGenealogico_${usuarioActual.nombre}`)
      );

      setArbol(arbolAlmacenado || arbolInicial);
    }
  }, [usuarioActual]);

  useEffect(() => {
    if (arbol && usuarioActual) {
      localStorage.setItem(
        `arbolGenealogico_${usuarioActual.nombre}`,
        JSON.stringify(arbol)
      );
    }
  }, [arbol, usuarioActual]);

  const actualizarNodo = (nodo, nombre, callback) => {
    if (nodo.nombre.toLowerCase() === nombre.toLowerCase()) {
      callback(nodo);
    } else {
      nodo.hijos.forEach((hijo) => actualizarNodo(hijo, nombre, callback));
    }
  };

  const agregarFamiliar = (nuevoFamiliar, padreNombre, esAncestro = false, grado = 1) => {
    setArbol((prevArbol) => {
      const copiaArbol = { ...prevArbol };
  
      if (esAncestro) {
        // Verifica si la lista de ancestros ya existe, si no, la inicializa
        copiaArbol.antecesores = copiaArbol.antecesores || [];
        copiaArbol.antecesores.push({
          ...nuevoFamiliar,
          grado: copiaArbol.grado - grado, // Calcula el grado para ancestros
          confirmado: false,
          fallecido: false,
          confirmacionesFallecimiento: 0,
          requiereConfirmacion: nuevoFamiliar.edad < 18
            ? "Menor de edad (requiere confirmación de un familiar directo)"
            : "Mayor de edad (requiere invitación para confirmar)",
        });
        return copiaArbol;
      }
  
      if (padreNombre) {
        // Busca el nodo padre y agrega al nuevo familiar como hijo
        actualizarNodo(copiaArbol, padreNombre, (nodoPadre) => {
          if (nuevoFamiliar.edad >= nodoPadre.edad) {
            alert("El hijo no puede ser mayor o igual en edad que el padre.");
            return;
          }
          nodoPadre.hijos.push({
            ...nuevoFamiliar,
            grado: nodoPadre.grado + 1, // Calcula el grado para descendientes
            confirmado: false,
            fallecido: false,
            confirmacionesFallecimiento: 0,
            requiereConfirmacion: nuevoFamiliar.edad < 18
              ? "Menor de edad (requiere confirmación de un familiar directo)"
              : "Mayor de edad (requiere invitación para confirmar)",
            hijos: [],
          });
        });
      } else {
        // Si no hay padre, agrega al nuevo familiar como hijo directo del árbol principal
        copiaArbol.hijos.push({
          ...nuevoFamiliar,
          grado,
          confirmado: false,
          fallecido: false,
          confirmacionesFallecimiento: 0,
          requiereConfirmacion: nuevoFamiliar.edad < 18
            ? "Menor de edad (requiere confirmación de un familiar directo)"
            : "Mayor de edad (requiere invitación para confirmar)",
          hijos: [],
        });
      }
  
      return copiaArbol;
    });
  };
  
  const confirmarFamiliar = (nombre) => {
    setArbol((prevArbol) => {
      const copiaArbol = { ...prevArbol };
      actualizarNodo(copiaArbol, nombre, (nodo) => {
        if (nodo.requiereConfirmacion) {
          nodo.confirmado = true;
          nodo.requiereConfirmacion = null;
          alert(`El registro de "${nodo.nombre}" ha sido confirmado.`);
        }
      });
      return copiaArbol;
    });
  };

  const confirmarFallecimiento = (nombre) => {
    setArbol((prevArbol) => {
      const copiaArbol = { ...prevArbol };
      actualizarNodo(copiaArbol, nombre, (nodo) => {
        nodo.confirmacionesFallecimiento += 1;
        if (nodo.confirmacionesFallecimiento >= 3) {
          nodo.fallecido = true;
          alert(`El fallecimiento de "${nodo.nombre}" ha sido confirmado.`);
        } else {
          alert(
            `Faltan ${
              3 - nodo.confirmacionesFallecimiento
            } confirmaciones para validar el fallecimiento.`
          );
        }
      });
      return copiaArbol;
    });
  };

  const familiaresPendientesConfirmacion = () => {
    const resultado = [];
    
    const recorrerArbol = (nodo) => {
      if (!nodo.confirmado && nodo.requiereConfirmacion) {
        resultado.push(nodo);
      }
      nodo.hijos.forEach((hijo) => recorrerArbol(hijo));
    };
  
    // Verifica tanto los hijos como los antecesores
    recorrerArbol(arbol);
    if (arbol.antecesores) {
      arbol.antecesores.forEach((ancestro) => {
        if (!ancestro.confirmado && ancestro.requiereConfirmacion) {
          resultado.push(ancestro);
        }
      });
    }
  
    return resultado;
  };
  

  const listarFamiliaPorGeneracionYEdad = (generacion) => {
    const resultado = [];
    const recorrerArbol = (nodo, nivel) => {
      if (nivel === generacion) {
        resultado.push(nodo);
      }
      nodo.hijos.forEach((hijo) => recorrerArbol(hijo, nivel + 1));
    };
    recorrerArbol(arbol, 0);
    return resultado.sort((a, b) => a.edad - b.edad);
  };

  const visualizarPorProfundidad = (limiteProfundidad) => {
    const copiarArbolConProfundidad = (nodo, nivelActual) => {
      if (nivelActual > limiteProfundidad) {
        return null;
      }
  
      return {
        ...nodo,
        hijos: nodo.hijos
          .map((hijo) => copiarArbolConProfundidad(hijo, nivelActual + 1))
          .filter(Boolean),
      };
    };
  
    // Incluye antecesores como un nodo especial
    const arbolConAntecesores = {
      ...arbol,
      antecesores: arbol.antecesores?.map((ancestro) => ({
        ...ancestro,
        hijos: [],
      })) || [],
    };
  
    return copiarArbolConProfundidad(arbolConAntecesores, 0);
  };
  

  const buscarParentesco = (nombre1, nombre2) => {
    let nodo1 = null;
    let nodo2 = null;

    const encontrarNodos = (nodo) => {
      if (nodo.nombre.toLowerCase() === nombre1.toLowerCase()) nodo1 = nodo;
      if (nodo.nombre.toLowerCase() === nombre2.toLowerCase()) nodo2 = nodo;
      nodo.hijos.forEach(encontrarNodos);
    };

    encontrarNodos(arbol);

    if (!nodo1 || !nodo2) return "No se encontró uno o ambos familiares.";
    if (nodo1.grado < nodo2.grado) return `${nodo1.nombre} es ancestro de ${nodo2.nombre}`;
    if (nodo1.grado > nodo2.grado) return `${nodo1.nombre} es descendiente de ${nodo2.nombre}`;
    return `${nodo1.nombre} y ${nodo2.nombre} son de la misma generación.`;
  };

  const reiniciarArbol = () => {
    if (window.confirm("¿Estás seguro de que deseas reiniciar el árbol?")) {
      const arbolInicial = {
        nombre: usuarioActual.nombre,
        edad: usuarioActual.edad,
        grado: 0,
        confirmado: true,
        fallecido: false,
        hijos: [],
        confirmacionesFallecimiento: 0,
      };
      localStorage.removeItem(`arbolGenealogico_${usuarioActual.nombre}`);
      setArbol(arbolInicial);
    }
  };

  return (
    <ArbolContext.Provider
      value={{
        arbol,
        agregarFamiliar,
        confirmarFallecimiento,
        confirmarFamiliar,
        familiaresPendientesConfirmacion,
        listarFamiliaPorGeneracionYEdad,
        visualizarPorProfundidad,
        buscarParentesco,
        reiniciarArbol,
      }}
    >
      {children}
    </ArbolContext.Provider>
  );
};

export default ArbolContext;
