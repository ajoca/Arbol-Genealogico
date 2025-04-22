import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import FamiliaForm from "./components/FamiliaForm";
import ListadoFamilia from "./components/ListadoFamilia";
import Busqueda from "./components/Busqueda";
import BusquedaParentesco from "./components/BusquedaParentesco";
import Visualizacion from "./components/Visualizacion";
import AuthContext from "./context/AuthContext";
import ArbolContext from "./context/ArbolContext";
import EditarPerfil from "./components/EditarPerfil";
import { Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./App.css";
import { Tabs, Tab } from "react-bootstrap";

function App() {
  const { usuarioActual, cerrarSesion } = useContext(AuthContext);
  const { reiniciarArbol } = useContext(ArbolContext);

  // Verifica si hay un usuario autenticado
  if (!usuarioActual) {
    return <Navigate to="/login" />;
  }

  const handleReiniciarArbol = () => {
    if (
      window.confirm(
        "¿Estás seguro de que deseas reiniciar el árbol para este usuario?"
      )
    ) {
      reiniciarArbol();
    }
  };

  return (
    <div>
      {/* Navbar dinámico */}
      <Navbar
        usuarioActual={usuarioActual}
        onCerrarSesion={cerrarSesion}
        onReiniciarArbol={handleReiniciarArbol}
      />

      <div className="container mt-4">
        <h1 className="text-center mb-4 text-primary">Árbol Genealógico</h1>

        {/* Pestañas para navegar entre secciones */}
        <Tabs defaultActiveKey="familiares" id="arbol-tabs" className="mb-3" fill>
          <Tab eventKey="familiares" title="Familiares">
            <div className="mt-4">
              <ListadoFamilia />
            </div>
          </Tab>

          <Tab eventKey="agregar" title="Agregar Familiar">
            <div className="mt-4">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title text-center text-secondary mb-3">Agregar Familiar</h5>
                <FamiliaForm />
              </div>
            </div>
          </Tab>

          <Tab eventKey="busqueda" title="Búsqueda">
            <div className="mt-4">
              <div className="row gx-3 gy-3">
                <div className="col-md-6">
                  <div className="card p-4 shadow-sm mb-3">
                    <h5 className="card-title text-center text-secondary">Buscar Familiar</h5>
                    <Busqueda />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="card p-4 shadow-sm">
                    <h5 className="card-title text-center text-secondary">Buscar Parentesco</h5>
                    <BusquedaParentesco />
                  </div>
                </div>
              </div>
            </div>
          </Tab>

          <Tab eventKey="visualizacion" title="Visualización Gráfica">
            <div className="mt-4">
              <div className="card p-4 shadow-sm visualizacion">
                <h5 className="card-title text-center text-secondary mb-3">Visualización Gráfica</h5>
                <Visualizacion />
              </div>
            </div>
          </Tab>

          {/* Nueva pestaña para editar perfil */}
          <Tab eventKey="perfil" title="Editar Perfil">
            <div className="mt-4">
              <div className="card p-4 shadow-sm">
                <h5 className="card-title text-center text-secondary mb-3">Editar Perfil</h5>
                <EditarPerfil />
              </div>
            </div>
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default App;
