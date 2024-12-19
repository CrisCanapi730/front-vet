// App.js
import React, { useState } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Mascotas from './Mascotas';
import Citas from './Citas';
import Ventas from './Ventas';
import Usuarios from './Usuarios';
import Productos from './Productos';
import IniciarSesion from './IniciarSesion';
import './styles/App.css';
import './styles/Footer.css';
import './styles/Header.css';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [usuarioLogueado, setUsuarioLogueado] = useState(null);

  const login = (usuario) => {
    setIsAuthenticated(true);
    setUsuarioLogueado(usuario);
    localStorage.setItem('usuario', JSON.stringify(usuario));
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUsuarioLogueado(null);
    localStorage.removeItem('usuario');
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <IniciarSesion onLogin={login} />
      ) : (
        <>
          <Header usuarioLogueado={usuarioLogueado} />
          <main>
            <ToastContainer />
            <div className="auth-actions">
              <button onClick={logout} className="btn">
                Cerrar sesión
              </button>
            </div>
            <Routes>
              <Route path="/inicio" element={<Home />} />
              <Route path="/ventas" element={<Ventas />} />
              <Route path="/mascotas" element={<Mascotas usuarioLogueado={usuarioLogueado} />} />
              <Route path="/citas" element={<Citas />} />
              {/* Rutas para Administradores */}
              {usuarioLogueado?.esAdmin && (
                <>
                  <Route path="/usuarios" element={<Usuarios />} />
                  <Route path="/productos" element={<Productos />} />
                </>
              )}
              {/* Rutas para usuarios regulares */}
              {!usuarioLogueado?.esAdmin && (
                <>
                  <Route path="/usuarios" element={<Navigate to="/inicio" />} />
                  <Route path="/productos" element={<Navigate to="/inicio" />} />
                </>
              )}
              {/* Redirección a /inicio para rutas no existentes */}
              <Route path="*" element={<Navigate to="/inicio" />} />
            </Routes>
          </main>
          <Footer />
        </>
      )}
    </div>
  );
}

export default App;