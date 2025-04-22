import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [usuarioActual, setUsuarioActual] = useState(null);

  // Cargar el usuario actual de localStorage al iniciar
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuarioActual");
    if (usuarioGuardado) {
      setUsuarioActual(JSON.parse(usuarioGuardado));
    }
  }, []);

  // Guardar el usuario actual en localStorage
  useEffect(() => {
    if (usuarioActual) {
      localStorage.setItem("usuarioActual", JSON.stringify(usuarioActual));
    } else {
      localStorage.removeItem("usuarioActual");
    }
  }, [usuarioActual]);

  // Registrar usuario
  const registrarUsuario = (usuario) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Normalizar el correo y validar datos
    usuario.correo = usuario.correo.toLowerCase();
    if (usuariosGuardados.some((u) => u.correo === usuario.correo)) {
      alert("Este correo ya está registrado.");
      return false;
    }
    if (usuario.edad <= 0) {
      alert("La edad debe ser un número positivo.");
      return false;
    }

    // Guardar usuario
    usuariosGuardados.push(usuario);
    localStorage.setItem("usuarios", JSON.stringify(usuariosGuardados));
    return true;
  };

  // Iniciar sesión
  const iniciarSesion = (correo, contraseña) => {
    const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuario = usuariosGuardados.find(
      (u) =>
        u.correo === correo.toLowerCase() && u.contraseña === contraseña
    );

    if (usuario) {
      setUsuarioActual(usuario);
      return true;
    } else {
      alert("Correo o contraseña incorrectos.");
      return false;
    }
  };

  // Editar perfil
  const editarPerfil = (datosActualizados) => {
    setUsuarioActual((prevUsuario) => {
      const usuariosGuardados = JSON.parse(localStorage.getItem("usuarios")) || [];
      const usuariosActualizados = usuariosGuardados.map((usuario) =>
        usuario.correo === prevUsuario.correo
          ? { ...usuario, ...datosActualizados }
          : usuario
      );
      localStorage.setItem("usuarios", JSON.stringify(usuariosActualizados));
      return { ...prevUsuario, ...datosActualizados };
    });
  };

  // Cerrar sesión
  const cerrarSesion = () => {
    setUsuarioActual(null);
  };

  return (
    <AuthContext.Provider
      value={{
        usuarioActual,
        registrarUsuario,
        iniciarSesion,
        editarPerfil,
        cerrarSesion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
