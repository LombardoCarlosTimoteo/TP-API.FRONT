import React, { useState } from "react";
import './registrarDepartamentos.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";

function RegistrarDepartamentos() {
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [dniDueño, setdniDueño] = useState('')
    const [dniInquilino, setdniInquilino] = useState('')
    const [estaAlquilado, setestaAlquilado] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const { userData, setUserData } = useContext(MyContext)

    const handleOtroDepartamento = (event) => {
        setdatosCorrectos(false);
        setPiso("")
        setDepartamento("")
        setDireccionEdificio("")
        setdniDueño("")
        setestaAlquilado("")
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if (userData.tipoUsuario === "admin") setdatosCorrectos(true);
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
                            <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccionEdificio" placeholder="Ingrese la dirección del edificio"
                                    onChange={handledireccionEdificio}
                                    value={direccionEdificio} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el núero piso"
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
                            <label for="Departamento" class="col-sm-2 col-form-label">DNI dueño</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre de la unidad"
                                    onChange={handledniDueño}
                                    value={dniDueño} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">¿Está alquilado?</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleestaAlquilado}>
                                        <option value="" disabled selected>Seleccione el estado de la unidad</option>
                                        <option value="SI">SI</option>
                                        <option value="NO">NO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <p></p>

                        {(estaAlquilado === "SI") && (
                            <div class="form-group row">
                                <label for="Departamento" class="col-sm-2 col-form-label">DNI inquilino</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre de la unidad"
                                        onChange={handledniInquilino}
                                        value={dniInquilino} />
                                </div>
                            </div>
                        )}
                        
                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-10">
                                <button type="submit" class="">Registrar edificio</button>
                            </div>
                        </div>
                    </form>
                )
            }
        </div >
    );
}

export default RegistrarDepartamentos;