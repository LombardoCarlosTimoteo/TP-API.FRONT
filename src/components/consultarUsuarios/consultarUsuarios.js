
import React, { useState } from "react";
import './consultarUsuarios.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import usuariosData from './Usuarios.json';
import { useEffect } from 'react';
function ConsultarUsuarios() {
    const [tipoUsuario, setTipoUsuario] = useState('');
    const [usuario, setusuario] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setdni] = useState('');
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')

    const [nuevotipoUsuario, setnuevotipoUsuario] = useState('');
    const [nuevonombre, setnuevonombre] = useState('');
    const [nuevoapellido, setnuevoApellido] = useState('');
    const [nuevodni, setnuevodni] = useState('');
    const [nuevopiso, setnuevoPiso] = useState("")
    const [nuevodepartamento, setnuevoDepartamento] = useState("")
    const [nuevodireccionEdificio, setnuevoDireccionEdificio] = useState('')
    const [usuarios, setUsuarios] = useState([]);

    const [dniABuscar, setdniABuscar] = useState('')
    const [usuarioABuscar, setusuarioABuscar] = useState('')

    // Carga de un json que contiene varios json
    // aca hacer la conexion con la api y hacer get de todos los usuarios
    useEffect(() => {
        setUsuarios(usuariosData);
    }, []);


    const handleSubmit = (event) => {
        event.preventDefault();
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
        if (nuevodni !== "") {
            setdni(nuevodni)
        }

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
    const handleUsuariosChange = (event) => {
        console.log(usuarios)
        setdniABuscar(event.target.value)
        for (let i = 0; i < usuarios.length; i++) {
            if (usuarios[i].dni === dniABuscar) {
                setusuarioABuscar(usuarios[i]);
                setNombre(usuarioABuscar.nombre)
                setApellido(usuarioABuscar.apellido)
            }
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
                                    {usuarios.map((usuario, index) => (
                                        <option key={index} value={usuario.dni}>
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
                        <p></p>

                    </div>
                    <div class="form-group row">
                        <label for="direccionEdificio" class="col-sm-2 col-form-label">Direc edificio actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" readOnly
                                value={direccionEdificio} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <label for="Piso" class="col-sm-2 col-form-label">Piso actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Piso" aria-describedby="Piso" readOnly
                                value={piso} />
                        </div>
                        <p></p>

                    </div>


                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Depto actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={departamento} />
                        </div>
                        <p></p>
                    </div>


                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Nombre actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={nombre} />
                        </div>
                        <p></p>
                    </div>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Apellido actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" readOnly
                                value={apellido} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <label for="dni" class="col-sm-2 col-form-label">DNI actual</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dni" aria-describedby="dni" readOnly
                                value={dni} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <label for="tipoUsuario" class="col-sm-2 col-form-label">Modificar Tipo de usuario</label>
                        <div class="col-sm-10">
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario1" value="admin" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario1">Admin</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario2" value="dueño" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario2">Dueño</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario3" value="inquilino" onChange={handlenuevoTipoUsuario} />
                                <label class="form-check-label" for="tipoUsuario3">Inquilino</label>
                            </div>
                        </div>
                        <p></p>

                    </div>


                    <div class="form-group row">
                        <label for="direccionEdificio" class="col-sm-2 col-form-label">Mod Direc. edificio</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" placeholder="Ingrese la dirección del edificio que le corresponde al usuario a modificar"
                                onChange={handlenuevodireccionEdificio}
                                value={nuevodireccionEdificio} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso del edificio que le corresponde al usuario a modificar"
                                onChange={handleNuevaPiso}
                                value={nuevopiso} />
                        </div>
                        <p></p>

                    </div>


                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Depto</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el departamento a modificar"
                                onChange={handleNuevoDepartamento}
                                value={nuevodepartamento} />
                        </div>
                        <p></p>
                    </div>


                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Nombre</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el nombre a modificar"
                                onChange={handleNombreChange}
                                value={nuevonombre} />
                        </div>
                        <p></p>
                    </div>

                    <div class="form-group row">
                        <label for="apellido" class="col-sm-2 col-form-label">Mod Apellido</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el apellido a modificar"
                                onChange={handlenuevoApellido}
                                value={nuevoapellido} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <label for="dni" class="col-sm-2 col-form-label">Mod DNI</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="dni" aria-describedby="dni" placeholder="Ingrese el dni a modificar"
                                onChange={handlenuevoDni}
                                value={nuevodni} />
                        </div>
                        <p></p>

                    </div>

                    <div class="form-group row">
                        <div class="col-sm-2"></div>
                        <div class="col-sm-10">
                            <button type="submit" >Realizar cambios</button>
                        </div>
                    </div>

                </div>
            </form>
        </div>
    )
}

export default ConsultarUsuarios;