import React, { useState } from "react";
import './consultarEdificios.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import edificiosData from './edificios.json';
import { useEffect } from 'react';

function ConsultarEdificios() {
    const [edificio, setEdificio] = useState("")
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [cantidadPisos, setcantidadPisos] = useState("")
    const [cantidadDepartamentos, setcantidadDepartamentos] = useState("")
    const [direccion, setDireccion] = useState("")

    const [nuevacantidadPisos, setnuevacantidadPisos] = useState("")
    const [nuevacantidadDepartamentos, setnuevacantidadDepartamentos] = useState("")
    const [nuevaDireccion, setnuevaDireccion] = useState("");
    const { userData, setUserData } = useContext(MyContext)

    const [edificios, setEdificios] = useState([]); //lista de todos los edificios
    const [edificioABuscar, setedificioABuscar] = useState('')

    //aca hacer la carga de todos los jsons
    useEffect(() => {
        if(userData.tipoUsuario === "ADMIN"){
            var URL = "http://localhost:8080/api/edificios"
            var token = `Bearer ${userData.token}`// + userData.token
            console.log(token)
            fetch(URL, {
                //credentials: 'include',
                //mode: "no-cors",
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': "application/json",
                    //'Content-Type': "text/plain",
                    //'Access-Control-Allow-Origin': '*',
                    //"Access-Control-Allow-Headers": '*',
                    //"Access-Control-Allow-Methods": 'GET,PUT,POST,DELETE'
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
            })
            .catch(error => console.log("Error: ", error))
        }
        else if(userData.tipoUsuario === "INQUILINO" || userData.tipoUsuario === "DUNIO"){
            var URL = "http://localhost:8080/api/edificios/{userData.idEdificio}"
            var token = `Bearer ${userData.token}`// + userData.token
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': "application/json",
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
            })
        }
        
    })
    useEffect(() => {
        setEdificios(edificiosData);
    }, []);
    
    const handleSubmit = (event) => {
        event.preventDefault();

        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else {
            //chequear que el usuario sea admin. si es admin, hacer el setdatoscorrectos
            setdatosCorrectos(true);
            if (nuevaDireccion !== "") {
                setDireccion(nuevaDireccion)
            }
            if (nuevacantidadDepartamentos !== "") {
                setcantidadDepartamentos(nuevacantidadDepartamentos)
            }
            if (nuevacantidadPisos !== "") {
                setcantidadPisos(nuevacantidadPisos)
            }
            setnuevaDireccion("")
            setnuevacantidadDepartamentos("")
            setnuevacantidadPisos("")
        }

    }
    const handlenuevaDireccion = (event) => {
        setnuevaDireccion(event.target.value)
    }
    const handlenuevacantidadDepartamentos = (event) => {
        setnuevacantidadDepartamentos(event.target.value)
    }
    const handlenuevacantidadPisos = (event) => {
        setnuevacantidadPisos(event.target.value)
    }
    const handleEliminarEdificio = (event) => {
        console.log("eliminar edificio")
    }

    const handleEdificioChange = (event) => {
        const nombreEdificioABuscar = event.target.value;
        console.log("nombreEdificioABuscar:", nombreEdificioABuscar);

        const edificioEncontrado = edificios.find(edificio => edificio.direccion === nombreEdificioABuscar);

        if (edificioEncontrado) {
            setedificioABuscar(nombreEdificioABuscar);
            setcantidadPisos(edificioEncontrado.cantidadPisos);
            setcantidadDepartamentos(edificioEncontrado.deptosPorPiso);
            setDireccion(edificioEncontrado.deptosPorPiso);
        }
    }


    return (
        <div>
            {userData.tipoUsuario === "" && (
                <h1>Inicia sesión para consultar reclamos.</h1>

            )}
            {userData.tipoUsuario === "admin" && (
                <div>
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Consultar edificios</h1>
                        <h1>{userData.token}</h1>
                        <p></p>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Edificios</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleEdificioChange}>
                                        <option value="" disabled selected>Seleccione un edificio</option>

                                        {edificios.map((edificio, index) => (
                                            <option key={index} value={edificio.direccion} onChange={handleEdificioChange}>
                                                {edificio.direccion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Dirección actual</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={direccion} readonly
                                />
                            </div>
                        </div>

                        <p></p>
                        
                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Cant Pisos actual</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={cantidadPisos} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Dtos. x piso actual</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={cantidadDepartamentos} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Mod dirección</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo"
                                    value={nuevaDireccion}
                                    onChange={handlenuevaDireccion}

                                    placeholder="Ingrese la dirección del edificio nuevamente para modificar" />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Mod cant. pisos</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="Ingrese la camtidad de pisos del edificio nuevamente para modificar"
                                    value={nuevacantidadPisos}
                                    onChange={handlenuevacantidadPisos}
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Mod Deptos x piso</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="ewq" aria-describedby="estadoRsdfsfdfeclamo" placeholder="Ingrese la cantidad de dpartamentos por piso del edificio nuevamente para modificar"
                                    value={nuevacantidadDepartamentos}
                                    onChange={handlenuevacantidadDepartamentos}
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-10 d-flex justify-content-center">
                                <button type="submit" className="mx-5">Realizar cambios</button>
                                <button onClick={handleEliminarEdificio} className="mx-5">Eliminar edificio</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
}

export default ConsultarEdificios;