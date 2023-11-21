
import React, { useState } from "react";
import './consultarUsuarios.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import usuariosData from './Usuarios.json';

import { useEffect } from 'react';
import { Alert } from "bootstrap";
function ConsultarUsuarios() {

    //aca va todo los datos actuales del usuario
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [usuario, setusuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [idUsuario, setidUsuario] = useState('');
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const { userData, setUserData } = useContext(MyContext)

    //aca se guardan aquellos atributos a cambiar
    const [nuevotipoUsuario, setnuevotipoUsuario] = useState('');
    const [nuevonombre, setnuevonombre] = useState('');
    const [nuevoapellido, setnuevoApellido] = useState('');
    const [nuevodni, setnuevodni] = useState('');
    const [nuevopiso, setnuevoPiso] = useState("")
    const [nuevodepartamento, setnuevoDepartamento] = useState("")
    const [nuevodireccionEdificio, setnuevoDireccionEdificio] = useState('')
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [dniABuscar, setdniABuscar] = useState('')
    const [usuarioABuscar, setusuarioABuscar] = useState('')

    
    useEffect(() => {
        if (userData.tipoUsuario === "ADMIN") {
            
            //Colocamos la variable URL que guarda la ruta de la API y le agregamos el token que se encuentra en el userData
            var URL = "http://localhost:8080/api/usuarios"
            var token = `Bearer ${userData.token}`// + userData.token
            
            //Hacemos el GET a la API de todos los usuarios
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo hacer el GET")
                    }
                    return response.json()
                })
                .then(response => {
                    JSON.stringify(response)
                    setListaUsuarios(response)
                })
                .catch(error => console.log("Error: ", error))
    }
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();

        //Se cambia aquellos atributos que se deseen. si se deja en blanco alguno, ese mismo no se mofifica
        if (nuevodireccionEdificio !== "") {
            setDireccionEdificio(nuevodireccionEdificio)
        }
        if (nuevotipoUsuario !== "") {
            setTipoUsuario(nuevotipoUsuario)
        }
        if (nuevopiso !== "") {
            setPiso(nuevopiso)
        }
        if (nuevodepartamento !== "") {
            setDepartamento(nuevodepartamento)
        }
        if (nuevonombre !== "") {
            setNombre(nuevonombre)
        }
        if (nuevoapellido !== "") {
            setApellido(nuevoapellido)
        }
        
        
        //Hacemos el PUT a la API para modificar el usuario
        fetch(`http://localhost:8080/api/usuarios/${usuarioABuscar}`, {
            headers: new Headers({
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'application/json'
            }),
            method: "PUT",
            body: JSON.stringify({
                tipoUsuario: tipoUsuario,
                nombre: nombre,
                apellido: apellido,
                piso: piso,
                departamento: departamento,
                direccionEdificio: direccionEdificio
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo hacer el PUT")
                }
                return response.json()
            }
            )
            .then(response => {
                JSON.stringify(response)
                console.log(response)
            })


        setnuevotipoUsuario("")
        setnuevonombre("")
        setnuevoApellido("")
        setnuevodni("")
        setnuevoDireccionEdificio("")
        setnuevoPiso("")
        setnuevoDepartamento("")
    }

    const handlenuevoTipoUsuario = (event) => {
        setnuevotipoUsuario(event.target.value);
    }
    const handleNombreChange = (event) => {
        setnuevonombre(event.target.value);
    }
    const handlenuevoApellido = (event) => {
        setnuevoApellido(event.target.value);
    }
    const handlenuevoDni = (event) => {
        setnuevodni(event.target.value);
    }
    const handlenuevodireccionEdificio = (event) => {
        setnuevoDireccionEdificio(event.target.value)
    }

    const handleNuevaPiso = (event) => {
        setnuevoPiso(event.target.value)
    }
    const handleNuevoDepartamento = (event) => {
        setnuevoDepartamento(event.target.value)
    }
    const handleEliminarUsuario = (event) => {
       console.log("eliminar usuario")
        
       var URL = `http://localhost:8080/api/usuarios/${idUsuario}`
       var token = `Bearer ${userData.token}`// + userData.token
       
       //Hacemos el DELETE a la API de todos los usuarios
       fetch(URL, {
           headers: new Headers({
               'Authorization': token,
               'Content-Type': 'application/json'
           }),
           method: "DELETE"
       })
           .then(response => {
               if (!response.ok) {
                   throw new Error("No se pudo hacer el GET")
               }
               return response
           })
           .then(response => {
            var URL = "http://localhost:8080/api/usuarios"
            var token = `Bearer ${userData.token}`// + userData.token
            
            //Hacemos el GET a la API de todos los usuarios
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo hacer el GET")
                    }
                    return response.json()
                })
                .then(response => {
                    JSON.stringify(response)
                    setListaUsuarios(response)
                })
                .catch(error => console.log("Error: ", error))
           })
           .catch(error => console.log("Error: ", error))


        }

    const handleUsuariosChange = (event) => {
        const usuarioABuscar = event.target.value;
        const usuarioEncontrado = listaUsuarios.find(usuario => usuario.id === parseInt(usuarioABuscar, 10));
        
        if (usuarioEncontrado) {

            setusuarioABuscar(usuarioABuscar);
            setNombre(usuarioEncontrado.nombre);
            setApellido(usuarioEncontrado.apellido);
            setTipoUsuario(usuarioEncontrado.tipoUsuario);
            setidUsuario(usuarioEncontrado.id)
        } 
    }

    return (
        <div>
            <form class="mx-auto" onSubmit={handleSubmit}>
                <h1>Consultar usuarios</h1>
                <p></p>
                <div class="form-group row">
                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Usuarios</label>
                        <div class="col-sm-10">
                            <div class="custom-select">
                            <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleUsuariosChange} >
                                    <option value="" disabled selected>Seleccione un usuario</option>
                                    {listaUsuarios.map((usuario, index) => (
                                        <option key={index} value={usuario.id}>
                                            {usuario.nombre} {usuario.apellido}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <p></p>

                    <div class="form-group row">
                        <label for="direccionEdificio" class="col-sm-2 col-form-label">Tipo usuario actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" readOnly
                                value={tipoUsuario} />
                        </div>
                    </div>
                    
                    <p></p>
                    
                    <div class="form-group row">
                        <label for="direccionEdificio" class="col-sm-2 col-form-label">Direc edificio actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" readOnly
                                value={direccionEdificio} />
                        </div>
                    </div>

                    <p></p>

                    <div class="form-group row">
                        <label for="Piso" class="col-sm-2 col-form-label">Piso actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Piso" aria-describedby="Piso" readOnly
                                value={piso} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Depto actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={departamento} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Nombre actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={nombre} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Apellido actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={apellido} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="dni" class="col-sm-2 col-form-label">ID actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dni" aria-describedby="dni" readOnly
                                value={idUsuario} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="tipoUsuario" class="col-sm-2 col-form-label">Modificar Tipo de usuario</label>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario1" value="ADMIN" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario1">Admin</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario2" value="DUENIO" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario2">Dueño</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario3" value="INQUILINO" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario3">Inquilino</label>
                            </div>
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="direccionEdificio" class="col-sm-2 col-form-label">Mod Direc. edificio</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" placeholder="Ingrese la dirección del edificio que le corresponde al usuario a modificar"
                                onChange={handlenuevodireccionEdificio}
                                value={nuevodireccionEdificio} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="Piso" class="col-sm-2 col-form-label">Mod Piso</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso del edificio que le corresponde al usuario a modificar"
                                onChange={handleNuevaPiso}
                                value={nuevopiso} />
                        </div>
                    </div>

                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Depto</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el departamento a modificar"
                                onChange={handleNuevoDepartamento}
                                value={nuevodepartamento} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Nombre</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el nombre a modificar"
                                onChange={handleNombreChange}
                                value={nuevonombre} />
                        </div>
                    </div>
                        
                    <p></p>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Apellido</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el apellido a modificar"
                                onChange={handlenuevoApellido}
                                value={nuevoapellido} />
                        </div>
                    </div>
                    
                    <p></p>
                    
                    <div class="form-group row">
                        <label for="dni" class="col-sm-2 col-form-label">Mod DNI</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dni" aria-describedby="dni" placeholder="Ingrese el dni a modificar"
                                onChange={handlenuevoDni}
                                value={nuevodni} />
                        </div>
                    </div>
                    
                    <p></p>

                    <div class="form-group row">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-10 d-flex justify-content-center">
                                <button type="submit" className="mx-5">Realizar cambios</button>
                                <button onClick={handleEliminarUsuario} className="mx-5">Eliminar usuario</button>
                            </div>
                        </div>
                </div>
            </form>
        </div>
    )
}

export default ConsultarUsuarios;