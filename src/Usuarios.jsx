import Axios from 'axios';
import { useEffect, useState } from 'react';
import './styles/App.css';


function Usuarios(){
    // Estados para Usuarios
    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [rol, setRol] = useState("");
    const [contrasena, setContrasena] = useState("");
    const [editar, setEditar] = useState(false);
    const [listaUsuarios, setUsuarios] = useState([]);
    const [id, setId] = useState("");

    useEffect(() => {
        getUsuarios();
    }, []);


    // Funciones para usuarios
    const add = () => {
        if (nombre.trim() === "" || correo.trim() === "" || contrasena.trim() === "" || rol.trim() === "") {
        alert("Por favor, completa todos los campos.");
        return;
        }
        Axios.post("http://localhost:3001/create",{
        nombre:nombre,
        correo:correo,
        contrasena:contrasena,
        rol:rol
        }).then(()=>{
        alert("Usuario Registrado");
        limpiarDatos();
        getUsuarios();
        });
    }

    const update = () => {
        Axios.put("http://localhost:3001/update",{
        id:id,
        nombre:nombre,
        correo:correo,
        contrasena:contrasena,
        rol:rol
        }).then(()=>{
        getUsuarios();
        alert("Usuario Actualizado");
        limpiarDatos();
        getUsuarios();
        });
    }

    const deleteUser = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
        getUsuarios();
        alert("Usuario ELIMINADO");
        limpiarDatos();
        getUsuarios();
        });
    }

    const limpiarDatos = () => {
        setNombre("");
        setCorreo("");
        setContrasena("");
        setEditar(false);
    }



    const editarUsuario = (val)=>{
        setEditar(true);
        setNombre(val.nombre);
        setCorreo(val.correo);
        setContrasena(val.contrasena);
        setRol(val.rol);
        setId(val.id);
    }

    const getUsuarios = () => {
        Axios.get("http://localhost:3001/usuarios").then((response)=>{
        setUsuarios(response.data);
        });
    }

    return (
        <div className='App'>
        <div className='datos'>

            <label htmlFor="">Nombre: <input value={nombre} 
            onChange={(event)=>{
            setNombre(event.target.value);
            }}
            type="text" placeholder="Ingresa tu nombre"/></label>

            <label htmlFor="">Correo electronico: <input value={correo} 
            onChange={(event)=>{
            setCorreo(event.target.value);
            }}
            type="text" placeholder="Ingresa tu correo"/></label>

            <label htmlFor="">Contrasena: <input value={contrasena} 
            onChange={(event)=>{
            setContrasena(event.target.value);
            }}
            type="text" placeholder="Ingresa tu contrasena"/></label>

            <label htmlFor="">Rol: <input value={rol} 
            onChange={(event)=>{
            setRol(event.target.value);
            }}
            type="text" placeholder="Ingresa un rol"/></label>

            <div>
            {
                editar?(
                <>
                    <button onClick={update}>Actualizar</button>
                    <button onClick={limpiarDatos}>Cancelar</button>
                </>
                ):(
                <button onClick={add}>Registrarse</button>
                )
            }
            </div>

            
        </div>
        <div className="listaUsuarios">

            <table>
            <thead>
                <tr>
                    <th>#</th>
                    <th>Nombre</th>
                    <th>Edad</th>
                    <th>Contrasena</th>
                    <th>Rol</th>
                    <th>Accion</th>
                </tr>
            </thead>
            <tbody>
                {
                listaUsuarios.map((val)=>{
                    return <tr key={val.id}>
                            <td>{val.id}</td>
                            <td>{val.nombre}</td>
                            <td>{val.correo}</td>
                            <td>{val.contrasena}</td>
                            <td>{val.rol}</td>
                            <td>
                            <div>
                                <button onClick={()=>{
                                editarUsuario(val);
                                }}>Actualizar</button>
                                <button onClick={()=>{
                                deleteUser(val.id);
                                }}>Eliminar</button>
                            </div>
                            </td>
                        </tr>
                })
                }
                
            </tbody>
            <tfoot>
                <tr>
                </tr>
            </tfoot>
            </table>

        </div>
        </div>
    )
}

export default Usuarios

