import { useState, useEffect } from 'react';
import Axios from 'axios';
import PropTypes from 'prop-types';
import videoBackground from './assets/videovet.mp4';

function IniciarSesion({ onLogin }) {
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [modoRegistro, setModoRegistro] = useState(false);
  const [listaUsuarios, setListaUsuarios] = useState([]);

  useEffect(() => {
    getUsuarios();
  }, []);

  const getUsuarios = () => {
    Axios.get('https://api-vet-zeta.vercel.app/usuarios')
      .then((response) => {
        setListaUsuarios(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener usuarios:', error);
      });
  };

  const iniciarSesion = () => {
    if (!correo.trim() || !contrasena.trim()) {
      alert('Por favor, ingresa tu correo y contraseña.');
      return;
    }

    const usuarioEncontrado = listaUsuarios.find(
      (usuario) =>
        usuario.correo === correo && usuario.contrasena === contrasena
    );

    if (usuarioEncontrado) {
      const esAdmin = usuarioEncontrado.rol === 'admin';
      if (esAdmin) {
        alert(`Bienvenido administrador, ${usuarioEncontrado.nombre}`);
      } else {
        alert(`Bienvenido, ${usuarioEncontrado.nombre}`);
      }
      localStorage.setItem('usuario', JSON.stringify(usuarioEncontrado));
      onLogin({ ...usuarioEncontrado, esAdmin });
    } else {
      alert('Usuario o contraseña incorrectos.');
    }
  };

  const registrarse = () => {
    if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    const usuarioExistente = listaUsuarios.find(
      (usuario) => usuario.correo === correo
    );
    if (usuarioExistente) {
      alert('El correo ya está registrado.');
      return;
    }

    Axios.post('https://api-vet-zeta.vercel.app/create', {
      nombre,
      correo,
      contrasena,
      rol: 'user' // Por defecto, los nuevos usuarios son 'user'
    })
      .then(() => {
        alert('Usuario registrado exitosamente.');
        setModoRegistro(false);
        limpiarCampos();
        getUsuarios();
      })
      .catch((error) => {
        console.error('Error al registrar usuario:', error);
      });
  };

  const limpiarCampos = () => {
    setNombre('');
    setCorreo('');
    setContrasena('');
  };

  const styles = {
    videoBackground: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      objectFit: 'cover',
      zIndex: -1,
    },
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '20px',
      backgroundColor: 'rgba(255, 255, 255, 0.85)',
      borderRadius: '8px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    },
    heading: {
      fontSize: '24px',
      textAlign: 'center',
      marginBottom: '20px',
      color: '#000',
    },
    title: {
      fontSize: '32px',
      textAlign: 'center',
      color: '#DAA520',
      marginTop: '20px',
      marginBottom: '10px',
    },
    label: {
      display: 'block',
      marginBottom: '15px',
    },
    input: {
      width: 'calc(100% - 10px)',
      padding: '10px',
      fontSize: '16px',
      marginTop: '5px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    button: {
      display: 'inline-block',
      width: '100%',
      padding: '10px',
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#2196f3',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      transition: 'background-color 0.3s',
      marginTop: '10px',
    },
    buttonSecondary: {
      backgroundColor: '#2196f3',
    },
  };

  return (
    <>
      <video style={styles.videoBackground} autoPlay loop muted>
        <source src={videoBackground} type="video/mp4" />
        Tu navegador no soporta el video.
      </video>
      <div style={styles.title}>
        <h1>Veterinaria Patito</h1>
      </div>
      <div style={styles.container}>
        <h1 style={styles.heading}>
          {modoRegistro ? 'Registrarse' : 'Iniciar Sesión'}
        </h1>

        {modoRegistro && (
          <label style={styles.label}>
            Nombre:
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Ingresa tu nombre"
              style={styles.input}
            />
          </label>
        )}

        <label style={styles.label}>
          Correo:
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="Ingresa tu correo"
            style={styles.input}
          />
        </label>

        <label style={styles.label}>
          Contraseña:
          <input
            type="password"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            placeholder="Ingresa tu contraseña"
            style={styles.input}
          />
        </label>

        <div>
          {modoRegistro ? (
            <button style={styles.button} onClick={registrarse}>
              Registrarse
            </button>
          ) : (
            <button style={styles.button} onClick={iniciarSesion}>
              Iniciar Sesión
            </button>
          )}
          <button
            style={{
              ...styles.button,
              ...styles.buttonSecondary,
            }}
            onClick={() => setModoRegistro(!modoRegistro)}
          >
            {modoRegistro
              ? '¿Ya tienes una cuenta? Inicia Sesión'
              : '¿No tienes cuenta? Regístrate'}
          </button>
        </div>
      </div>
    </>
  );
}

IniciarSesion.propTypes = {
  onLogin: PropTypes.func.isRequired,
};

export default IniciarSesion;