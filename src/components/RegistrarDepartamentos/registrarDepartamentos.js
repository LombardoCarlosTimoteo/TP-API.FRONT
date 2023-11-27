import React, { useState } from "react";
import './registrarDepartamentos.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from 'react';

function RegistrarDepartamentos() {
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [dniDueño, setdniDueño] = useState('')
    const [dniInquilino, setdniInquilino] = useState('')
    const [estaAlquilado, setestaAlquilado] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const { userData, setUserData } = useContext(MyContext)
    const [listaTodosEdificios, setlistaTodosEdificios] = useState([]); //lista de todos los edificios
    const [edificioSeleccionado, setedificioSeleccionado] = useState('')


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

    const handleOtroDepartamento = (event) => {
        setdatosCorrectos(false);
        setPiso("")
        setDepartamento("")
        setDireccionEdificio("")
    }

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if (userData.tipoUsuario === "ADMIN") {
        
                event.preventDefault();
                try {
                var URL = "http://localhost:8080/api/departamentos";
                var data = {
                    "direccionEdificio":edificioSeleccionado,
                    "pisoDepartamento": piso,
                    "unidadDepartamento": departamento,
                };
            
                var response = await fetch(URL, {
                    method: 'POST',
                    headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userData.token}`,
                    },
                    body: JSON.stringify(data),
                });
            
                var responseData = await response.json();
                console.log(responseData);
                
                //setnroReclamo(responseData.id);
                setdatosCorrectos(true);
                
                } catch (error) {
                console.error("Error:", error);
                }
                setdatosCorrectos(true);
              }
            //crear departamento aca
            
        
        else alert("No tienes permisos de administrador")
    }

    const handledireccionEdificio = (event) => {
        setDireccionEdificio(event.target.value)
    }

    const handlePiso = (event) => {
        setPiso(event.target.value)
    }
    const handleDepartamento = (event) => {
        setDepartamento(event.target.value)
    }

    const handledniDueño = (event) => {
        setdniDueño(event.target.value)
    }

    const handledniInquilino = (event) => {
        setdniInquilino(event.target.value)
    }

    const handleestaAlquilado = (event) => {
        setestaAlquilado(event.target.value)
    }
    const handleEliminarDepartamento = (event) => {
        console.log("eliminar depto")
    }

    const handleEdificioChange = (event) => {
        setedificioSeleccionado(event.target.value)
    }



    return (
        <div>
            {datosCorrectos ? (
                <div className="header">

                    <h1>Departamento registrado</h1>

                    <button onClick={handleOtroDepartamento} className="session-button">Registrar otro departamento</button>
                </div>) :
                (
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Formulario registrar departamento</h1>

                        <p></p>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Dirección Edificios</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleEdificioChange} >
                                        <option value="" disabled selected>Seleccione un edificio</option>

                                        {listaTodosEdificios.map((edificio, index) => (
                                            <option key={index} value={edificio.direccion}>
                                                {edificio.direccion}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso"
                                    onChange={handlePiso}
                                    value={piso} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre de la unidad"
                                    onChange={handleDepartamento}
                                    value={departamento} />
                            </div>
                        </div>

                        <p></p>
                        <div class="form-group row">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-10 d-flex justify-content-center">
                                <button type="submit" className="mx-5">Registrar departamento</button>
                            </div>
                        </div>
                    </form>
                )
            }
        </div >
    );
}

export default RegistrarDepartamentos;