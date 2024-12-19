import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './styles/Header.css';

const Header = ({ usuarioLogueado }) => {
  return (
    <header>
      <div className="logo-title">
        <img
          src="https://img.freepik.com/vector-premium/patito-goma-bano-sobre-fondo-azul_546897-923.jpg"
          alt="Patito de goma"
          className="logo-img"
        />
        <h1>Veterinaria Patito</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/inicio">Inicio</Link></li>
          {usuarioLogueado?.esAdmin && (
            <>
              <li><Link to="/usuarios">Usuarios</Link></li>
              <li><Link to="/productos">Productos</Link></li>
            </>
          )}
          <li><Link to="/mascotas">Mascotas</Link></li>
          <li><Link to="/citas">Citas</Link></li>
          <li><Link to="/ventas">Ventas</Link></li>
        </ul>
      </nav>
    </header>
  );
};

Header.propTypes = {
  usuarioLogueado: PropTypes.shape({
    esAdmin: PropTypes.bool,
    nombre: PropTypes.string,
    correo: PropTypes.string,
    rol: PropTypes.string
  })
};

Header.defaultProps = {
  usuarioLogueado: null
};

export default Header;