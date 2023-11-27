import React, { useState } from "react";
import './registrarEdificio.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";

function RegistrarEdificio() {
    const [cantidadPisos, setCantidadPisos] = useState("")
    const [departamentosPorPiso, setDepartamentoPorPiso] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const { userData, setUserData } = useContext(MyContext)

    const handleOtroedificio = (event) => {
        setdatosCorrectos(false);
        setCantidadPisos("")
        setDepartamentoPorPiso("")
        setDireccionEdificio("")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if(userData.tipoUsuario ==="ADMIN"){
            setdatosCorrectos(true);
            var URL = "http://localhost:8080/api/edificios"
            var token = `Bearer ${userData.token}`// + userData.token
            var data = {
                "direccion": direccionEdificio.toLowerCase(),
                "pisos": cantidadPisos,
                "unidadesXPiso": departamentosPorPiso
            }
            
            fetch(URL, {
                headers: {
                    'Authorization': token,
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify(data)
                
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo hacer el POST")
                    }
                    return response.json()
                })
                .catch(error => console.log("Error: ", error))
           }
        else alert("No eres administrador")
    }
    
    const handledireccionEdificio = (event) => {
        setDireccionEdificio(event.target.value)
    }

    const handlePiso = (event) => {
        setCantidadPisos(event.target.value)
    }
    
    const handleDepartamento = (event) => {
        setDepartamentoPorPiso(event.target.value)
    }

    return (
        <div>
            {datosCorrectos ? (
                <div className="header">
                    <h1>Edificio registrado</h1>

                    <button onClick={handleOtroedificio} className="session-button">Registrar otro edificio</button>
                </div>) :
                (
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Formulario registrar edificio</h1>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccionEdificio" placeholder="Ingrese la dirección del edificio"
                                    onChange={handledireccionEdificio}
                                    value={direccionEdificio} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Cantidad pisos</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese la cantidad pisos que tiene el edificio"
                                    onChange={handlePiso}
                                    value={cantidadPisos} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Deptos. por piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese la cantidad de departamentos por piso que tiene el edificio"
                                    onChange={handleDepartamento}
                                    value={departamentosPorPiso} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div className="col-sm-11 d-flex justify-content-center">
                                <button type="submit" className="mx-5" class="">Registrar edificio</button>                            </div>
                        </div>
                    </form>
                )}
        </div>
    );
}

export default RegistrarEdificio;