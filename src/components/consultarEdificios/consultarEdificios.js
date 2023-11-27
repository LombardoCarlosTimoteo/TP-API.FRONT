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

    const [listaTodosEdificios, setlistaTodosEdificios] = useState([]); //lista de todos los edificios
    const [edificioABuscar, setedificioABuscar] = useState('')

    //aca hacer la carga de todos los jsons
    useEffect(() => {
        if(userData.tipoUsuario === "ADMIN"){
            var URL = "http://localhost:8080/api/edificios"
            var token = `Bearer ${userData.token}`// + userData.token
            console.log(token)
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
                setlistaTodosEdificios(response)
            })
            .catch(error => console.log("Error: ", error))
        }
        
    }, [])


    const handleRealizarCambios = (event) => {
        event.preventDefault();

        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else {
            setdatosCorrectos(true);
            if (nuevaDireccion !== "") {
                setDireccion(nuevaDireccion)
            }
            setnuevaDireccion("")
            var URL = `http://localhost:8080/api/edificios/${edificioABuscar}`
            var token = `Bearer ${userData.token}`
            var data = {
                "direccion": nuevaDireccion.toLowerCase()
            }
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': "application/json",
                    
                }),
                method: "PUT",
                body: JSON.stringify(data)

            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("No se pudo hacer el UPDATE")
                }
                setDireccion(nuevaDireccion.toLowerCase())
            })
            .then(response =>{
                    var URL = "http://localhost:8080/api/edificios"
                    var token = `Bearer ${userData.token}`// + userData.token
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
                        console.log("LALALALALLA", response)
                        const r = response
                        setlistaTodosEdificios(r)
                    })
                    .catch(error => console.log("Error: ", error))
                })
            .catch(error => console.log("Error: ", error))
            

        }
                //
    }

    const handlenuevaDireccion = (event) => { 
        setnuevaDireccion(event.target.value)
    }

 
    const handleEliminarEdificio = (event) => {
        event.preventDefault();
        
            var URL = `http://localhost:8080/api/edificios/${edificioABuscar}`
            var token = `Bearer ${userData.token}`
            fetch(URL, {
                headers: new Headers({
                    Authorization: token,
                    
                }),
                method: "DELETE"
            })
            .then(response => {
                alert("Edificio eliminado correctamente")
            })

            .then(response =>{
                var URL = "http://localhost:8080/api/edificios"
                var token = `Bearer ${userData.token}`// + userData.token
                console.log(token)
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
                    setlistaTodosEdificios(response)
                })
                .catch(error => console.log("Error: ", error))
            })
            .catch(error => console.log("Error: ", error))
        
    
    
    setcantidadDepartamentos("")
    setcantidadPisos("")
    setDireccion("")
    }

    const handleEdificioChange = (event) => {
        const idEdificioABuscar = event.target.value;
        const edificioEncontrado = listaTodosEdificios.find(edificio => edificio.id === parseInt(idEdificioABuscar,10));
        setedificioABuscar(idEdificioABuscar)
        
        if (edificioEncontrado) {
            console.log("aaaa:", idEdificioABuscar);
            setedificioABuscar(idEdificioABuscar);
            setcantidadPisos(edificioEncontrado.pisos);
            setcantidadDepartamentos(edificioEncontrado.unidadesXPiso);
            setDireccion(edificioEncontrado.direccion);
        }
    }


    return (
        <div>
            {userData.tipoUsuario === "" && (
                <h1>Inicia sesión para consultar reclamos.</h1>

            )}
            {userData.tipoUsuario === "ADMIN" && (
                <div>
                    <form class="mx-auto" onSubmit={handleRealizarCambios}>
                        <h1>Consultar edificios</h1>
                        <p></p>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Edificios</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleEdificioChange} >
                                        <option value="" disabled selected>Seleccione un edificio</option>

                                        {listaTodosEdificios.map((edificio, index) => (
                                            <option key={index} value={edificio.id}>
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