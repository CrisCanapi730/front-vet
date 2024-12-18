import { getAuth, signInAnonymously } from "firebase/auth";
import { getToken, onMessage } from 'firebase/messaging';
import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import Citas from './Citas';
import Footer from './Footer';
import Header from './Header';
import Home from './Home';
import Mascotas from './Mascotas';
import Productos from './Productos';
import Usuarios from './Usuarios';
import { messaging } from './firebase';
import './styles/App.css';
import './styles/Footer.css';
import './styles/Header.css';
import GestionarCitas from "./GestionarCitas";
import Ventas from "./Ventas";
import Login from "./Login";


function App() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login" || location.pathname === "/"; // Definir la página predeterminada

  // Función de inicio de sesión anónimo
  const loginAnonymously = () => {
    signInAnonymously(getAuth())
      .then((user) => console.log("Inicio de sesión anónimo exitoso", user))
      .catch((error) => console.error("Error en inicio de sesión anónimo", error));
  };

  // Función para activar el token de notificación
  const enableNotifications = async () => {
    try {
      const token = await getToken(messaging, {
        vapidKey: "BAn-7aFkPFpuVq1tjG1x3ox1VsnFgqQtLoV1uMY5-8V7axoy1U8VgUx7vIRTPUbtGbyCNlRiJn81QZNyPIHJQxA",
      });
      if (token) {
        console.log("Token de notificación:", token);
      } else {
        console.warn("No se pudo obtener el token de notificación.");
      }
    } catch (error) {
      console.error("Error al obtener el token de notificación:", error);
    }
  };

  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/firebase-messaging-sw.js")
        .then((registration) => {
          console.log("Service Worker registrado exitosamente:", registration);
        })
        .catch((error) => {
          console.error("Error al registrar el Service Worker:", error);
        });
    }

    onMessage(messaging, (message) => {
      console.log("Mensaje en primer plano recibido:", message);

      if (Notification.permission === 'granted') {
        new Notification(message.notification.title, {
          body: message.notification.body,
          icon: '/icon.png'
        });
      } else {
        toast(message.notification.title);
      }
    });
  }, []);

  return (
    <div className="App">
      {!isLoginPage && <Header />}
      <main>
        <ToastContainer />
        {!isLoginPage && (
          <>
            <button onClick={loginAnonymously}>Iniciar sesión anónimo</button>
            <button onClick={enableNotifications}>Habilitar notificaciones</button>
          </>
        )}
        <Routes>
          <Route path="/" element={<Login />} /> {/* Asegurando que el login sea la ruta por defecto */}
          <Route path="/inicio" element={<Home />} />
          <Route path="/usuarios" element={<Usuarios />} />
          <Route path="/mascotas" element={<Mascotas />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/ventas" element={<Ventas />} />
          <Route path="/citas" element={<Citas />} />
          <Route path="/gestionarCitas" element={<GestionarCitas />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  );
}

export default App;
