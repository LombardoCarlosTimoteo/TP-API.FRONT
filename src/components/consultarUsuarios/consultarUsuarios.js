
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
    const [username, setUsername] = useState('');


    //aca se guardan aquellos atributos a cambiar
    const [nuevotipoUsuario, setnuevotipoUsuario] = useState('');
    const [nuevonombre, setnuevonombre] = useState('');
    const [nuevoapellido, setnuevoApellido] = useState('');
    const [nuevoUsername, setnuevoUsername] = useState('');
    const [nuevopiso, setnuevoPiso] = useState("")
    const [nuevodepartamento, setnuevoDepartamento] = useState("")
    const [nuevodireccionEdificio, setnuevoDireccionEdificio] = useState('')
    const [listaUsuarios, setListaUsuarios] = useState([]);

    const [dniABuscar, setdniABuscar] = useState('')
    const [usuarioABuscar, setusuarioABuscar] = useState('')


    useEffect(() => {
        if (userData.tipoUsuario === "ADMIN") {

            //Colocamos la variable URL que guarda la ruta de la API y le agregamos el token que se encuentra en el userData
            var URL = "http://localhost:8080/auth/userLogin"
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
        var nombre2
        var apellido2
        var username2
        //Se cambia aquellos atributos que se deseen. si se deja en blanco alguno, ese mismo no se mofifica

        if (nuevonombre !== "") {
            nombre2=nuevonombre
        }
        else{
            nombre2 = nombre
        }
        if (nuevoapellido !== "") {
            apellido2=nuevoapellido
            setApellido(nuevoapellido)
             console.log("nuevoapellido")
        }
        else{
            apellido2=apellido
        }
        if (nuevoUsername !== "") {
            username2=nuevoUsername
            console.log("nuevoUsername")
            setUsername(nuevoUsername)
        }
        else{
            username2=username
        }

        //Hacemos el PUT a la API para modificar el usuario
        fetch(`http://localhost:8080/auth/userLogin/${usuarioABuscar}`, {
            headers: new Headers({
                Authorization: `Bearer ${userData.token}`,
                'Content-Type': 'application/json'
            }),
            method: "PUT",
            body: JSON.stringify({
                nombre: nombre2,
                apellido: apellido2,
                username: username2,
            })
        })
            .then(response => {
                if (!response.ok) {
                    alert("No se ha podido realizar los cambios")
                    setnuevotipoUsuario("")
                    setnuevonombre("")
                    setnuevoApellido("")
                    setnuevoUsername("")
                    setnuevoDireccionEdificio("")
                    setnuevoPiso("")
                    setnuevoDepartamento("")
                    throw new Error("No se pudo hacer el PUT")
                }
                alert("Cambios realizados con exito")
                setnuevotipoUsuario("")
                setnuevonombre("")
                setnuevoApellido("")
                setnuevoUsername("")
                setnuevoDireccionEdificio("")
                setnuevoPiso("")
                setnuevoDepartamento("")
                setNombre(nombre2)
                setApellido(apellido2)
                setUsername(username2)
                //return response.json()
            }
            )
            .then(response => {
                //JSON.stringify(response)
                console.log(response)
            })
            .then(response => {
                var URL = "http://localhost:8080/auth/userLogin"
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
                        const r=response
                        setListaUsuarios(r)
                        console.log("r",r)
                    })
                    .catch(error => console.log("Error: ", error))
                    
                    
            })
            .catch(error => console.log("Error: ", error))


        setnuevotipoUsuario("")
        setnuevonombre("")
        setnuevoApellido("")
        setnuevoUsername("")
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
    const handlenuevoUsername = (event) => {
        setnuevoUsername(event.target.value);
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
        var URL = `http://localhost:8080/auth/userLogin/${idUsuario}`
        var token = `Bearer ${userData.token}`// + userData.token

        //Hacemos el DELETE a la API de todos los usuarios
        fetch(URL, {
            headers: new Headers({
                'Authorization': token,
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
                var URL = "http://localhost:8080/auth/userLogin"
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
                            alert("Usuario no encontrado")

                            setTipoUsuario("")
                            setDireccionEdificio("")
                            setPiso("")
                            setDepartamento("")
                            setNombre("")
                            setApellido("")
                            setidUsuario("")
                            throw new Error("No se pudo hacer el GET")
                        }

                        alert("Usuario eliminado correctamente")
                        setTipoUsuario("")
                        setDireccionEdificio("")
                        setPiso("")
                        setDepartamento("")
                        setNombre("")
                        setApellido("")
                        setidUsuario("")
                        return response.json()
                    })
                    .then(response => {
                        JSON.stringify(response)
                        setListaUsuarios(response)
                    })
                    .catch(error => console.log("Error: ", error))
            })
            .catch(error => console.log("Error: ", error))

        setTipoUsuario("")
        setDireccionEdificio("")
        setPiso("")
        setDepartamento("")
        setNombre("")
        setApellido("")
        setidUsuario("")

    }

    const handleModificarUsuario = (event) => {
        event.preventDefault();
    }


    const handleUsuariosChange = (event) => {
        const usuarioABuscar = event.target.value;
        const usuarioEncontrado = listaUsuarios.find(usuario => usuario.id === parseInt(usuarioABuscar, 10));

        if (usuarioEncontrado) {

            setusuarioABuscar(usuarioABuscar);
            setNombre(usuarioEncontrado.nombre);
            setApellido(usuarioEncontrado.apellido);
            if (usuarioEncontrado.tipoUsuario === "DUENIO") {
                setTipoUsuario("DUEÑO");
            }
            else
                setTipoUsuario(usuarioEncontrado.tipoUsuario)
            setidUsuario(usuarioEncontrado.id);


            var URL = `http://localhost:8080/api/context/${usuarioEncontrado.id}`
            var token = `Bearer ${userData.token}`
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            })
                .then(response => {
                    if (!response.ok) {
                        setDepartamento("EL USUARIO NO ESTA ASIGNADO A UN DEPARTAMENTO")
                        setDireccionEdificio("EL USUARIO NO ESTA ASIGNADO A UN DEPARTAMENTO")
                        setPiso("EL USUARIO NO ESTA ASIGNADO A UN DEPARTAMENTO")
                        throw new Error("No se pudo hacer el GET")
                    }
                    return response.json()
                })
                .then(response => {
                    JSON.stringify(response)
                    setDireccionEdificio(response.direccionEdificio)
                    setPiso(response.pisoDepartamento)
                    setDepartamento(response.unidadDepartamento)
                })
                .catch(error => console.log("Error: ", error))
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
                                            {/* {usuario.nombre} {usuario.apellido} */
                                                usuario.username}
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
                        <label for="dni" class="col-sm-2 col-form-label">Mod Username</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dni" aria-describedby="dni" placeholder="Ingrese el Username a modificar"
                                onChange={handlenuevoUsername}
                                value={nuevoUsername} />
                        </div>
                    </div>

                    <p></p>

                    <div class="form-group row">
                        <div class="col-sm-1"></div>
                        <div className="col-sm-10 d-flex justify-content-center">
                            <button onClick={handleSubmit} type="submit" className="mx-5">Realizar cambios</button>
                            <button onClick={handleEliminarUsuario} className="mx-5">Eliminar usuario</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default ConsultarUsuarios;