import Axios from 'axios';
import { useState, useEffect } from 'react';
import './styles/Ventas.css'; // Archivo de estilos separado



function Ventas() {
    // Estados para la búsqueda y venta
    const [busqueda, setBusqueda] = useState("");
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [cantidadVenta, setCantidadVenta] = useState(1);
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [listaProductos, setListaProductos] = useState([]);

    // Obtener la lista de productos al cargar el componente
    useEffect(() => {
        obtenerProductos();
    }, []);

    const obtenerProductos = () => {
        Axios.get("http://localhost:3001/productos")
            .then((response) => {
                setListaProductos(response.data);
                setProductosFiltrados(response.data); // Mostrar todos los productos inicialmente
            })
            .catch((error) => {
                console.error("Error al obtener productos:", error);
            });
    };

    // Filtrar productos por el término de búsqueda
    const buscarProducto = (e) => {
        setBusqueda(e.target.value);
        const productosFiltrados = listaProductos.filter((producto) =>
            producto.nombre.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setProductosFiltrados(productosFiltrados);
    };

    // Manejar la venta de un producto
    const venderProducto = () => {
        if (!productoSeleccionado || cantidadVenta < 1) {
            alert("Por favor, selecciona un producto y una cantidad válida.");
            return;
        }

        const nuevaCantidad = productoSeleccionado.cantidadUnidades - cantidadVenta;

        if (nuevaCantidad < 0) {
            alert("No hay suficientes unidades en stock para realizar la venta.");
            return;
        }

        Axios.put("http://localhost:3001/updateProducto", {
            cod: productoSeleccionado.cod,
            nombre: productoSeleccionado.nombre,
            descripcion: productoSeleccionado.descripcion,
            precio: productoSeleccionado.precio,
            contenido: productoSeleccionado.contenido,
            cantidadUnidades: nuevaCantidad,
            imagen: productoSeleccionado.imagen,
        })
            .then(() => {
                alert("Producto vendido con éxito.");
                setBusqueda("");
                setCantidadVenta(1);
                setProductoSeleccionado(null);
                obtenerProductos(); // Actualizar la lista de productos
            })
            .catch((error) => {
                console.error("Error al vender producto:", error);
            });
    };

    return (
        <div className="ventas-container">
            <h2>Ventas de Productos</h2>
            <div className="busqueda-container">
                <input
                    type="text"
                    value={busqueda}
                    onChange={buscarProducto}
                    placeholder="Buscar producto..."
                    className="input-busqueda"
                />
            </div>

            <div className="resultados-busqueda">
                {productosFiltrados.length > 0 ? (
                    <div className="productos-grid">
                        {productosFiltrados.map((producto) => (
                            <div
                                key={producto.cod}
                                className="producto-card"
                                onClick={() => setProductoSeleccionado(producto)}
                            >
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="producto-imagen"
                                />
                                <div className="producto-info">
                                    <h4>{producto.nombre}</h4>
                                    <p>{producto.precio} Bs</p>
                                    <p>{producto.cantidadUnidades} en stock</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    busqueda && <p>No se encontraron productos.</p>
                )}
            </div>

            {productoSeleccionado && (
                <div className="detalle-venta">
                    <h3>Detalle del Producto</h3>
                    <img
                        src={productoSeleccionado.imagen}
                        alt={productoSeleccionado.nombre}
                        className="detalle-imagen"
                    />
                    <p><strong>Nombre:</strong> {productoSeleccionado.nombre}</p>
                    <p><strong>Precio:</strong> {productoSeleccionado.precio} Bs</p>
                    <p><strong>Unidades en Stock:</strong> {productoSeleccionado.cantidadUnidades}</p>
                    <label>
                        Cantidad a Vender: 
                        <input
                            type="number"
                            value={cantidadVenta}
                            onChange={(e) => setCantidadVenta(parseInt(e.target.value))}
                            min="1"
                            max={productoSeleccionado.cantidadUnidades}
                            className="input-cantidad"
                        />
                    </label>
                    <button onClick={venderProducto} className="btn-vender">Vender</button>
                </div>
            )}
        </div>
    );
}

export default Ventas;
