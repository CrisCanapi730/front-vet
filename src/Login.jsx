import { useNavigate } from "react-router-dom";
import './styles/Login.css'; // Asegúrate de tener el archivo de estilo solo para Login
import videoSource from './videovet.mp4'; // Ruta relativa si el video está al mismo nivel que Login.jsx

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    // Aquí puedes agregar lógica de autenticación en el futuro
    navigate("/inicio"); // Redirige al componente Home
  };

  return (
    <div className="login-container">
      {/* Video de fondo */}
      <video className="background-video" autoPlay loop muted>
        <source src={videoSource} type="video/mp4" />
        Tu navegador no soporta el formato de video.
      </video>

      <h1 className="login-title">Veterinaria Patito</h1>
      
      <form className="login-form">
        <h2>Inicio de Sesión</h2>
        <label htmlFor="email">Correo Electrónico</label>
        <input type="email" id="email" placeholder="Ingresa tu correo" />
        <label htmlFor="password">Contraseña</label>
        <input type="password" id="password" placeholder="Ingresa tu contraseña" />
        <button type="button" onClick={handleLogin}>
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
};

export default Login;
