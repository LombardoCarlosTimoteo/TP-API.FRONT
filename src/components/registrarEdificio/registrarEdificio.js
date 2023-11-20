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

        console.log("Particular")
        console.log(direccionEdificio)
        console.log(cantidadPisos)
        console.log(departamentosPorPiso)
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if(userData.tipoUsuario ==="admin") setdatosCorrectos(true);
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
                            <p></p>

                        </div>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Cantidad pisos</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese la cantidad pisos que tiene el edificio"
                                    onChange={handlePiso}
                                    value={cantidadPisos} />
                            </div>
                            <p></p>

                        </div>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Deptos. por piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese la cantidad de departamentos por piso que tiene el edificio"
                                    onChange={handleDepartamento}
                                    value={departamentosPorPiso} />
                            </div>
                            <p></p>

                        </div>



                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-10">
                                <button type="submit" class="">Registrar edificio</button>                            </div>
                        </div>
                    </form>


                )}
        </div>


    );
}

export default RegistrarEdificio;