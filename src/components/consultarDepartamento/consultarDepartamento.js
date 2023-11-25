import React, { useState } from "react";
import './consultarDepartamento.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";

function ConsultarDepartamentos() {
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [dniDueño, setdniDueño] = useState('')
    const [dniInquilino, setdniInquilino] = useState('')
    const [estaAlquilado, setestaAlquilado] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const { userData, setUserData } = useContext(MyContext)
    const [listaTodosDepartamentosDadoEdificio, setlistaTodosDepartamentosDadoEdificio ] = useState([])

    const [pisoNuevo, setpisoNuevo] = useState("")
    const [departamentoNuevo, setdepartamentoNuevo] = useState("")
    const [direccionEdificioNuevo, setdireccionEdificioNuevo] = useState('')
    const [dniDueñoNuevo, setdniDueñoNuevo] = useState('')
    const [dniInquilinoNuevo, setdniInquilinoNuevo] = useState('')
    const [estaAlquiladoNuevo, setestaAlquiladoNuevo] = useState('')

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
        else if (userData.tipoUsuario === "ADMIN") {
            //crear departamento aca
            setdatosCorrectos(true);
        }
        else alert("No tienes permisos de administrador")
    }

    const handledireccionEdificio = (event) => {
        setDireccionEdificio(event.target.value)
    }

    const handleNuevoPiso = (event) => {
        setPiso(event.target.value)
    }
    const handleNuevoDepartamento = (event) => {
        setDepartamento(event.target.value)
    }

    const handleNuevoDniDueño = (event) => {
        setdniDueño(event.target.value)
    }

    const handleNuevoDniInquilino = (event) => {
        setdniInquilino(event.target.value)
    }

    const handleNuevoEstaAlquilado = (event) => {
        setestaAlquilado(event.target.value)
    }
    const handleEliminarDepartamento = (event) => {
        console.log("eliminar depto")
    }

    const handleDepartamentoSeleccionado = (event) => {
        const idDepartamentoABuscar = event.target.value;
        const departamentoEncontrado = listaTodosDepartamentosDadoEdificio.find(departamento => departamento.id === parseInt(idDepartamentoABuscar,10));
        console.log(idDepartamentoABuscar)

        if (departamentoEncontrado) {
            console.log("aaaa:", idDepartamentoABuscar);
        }
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
                        <h1>Formulario consultar departamento</h1>

                        <p></p>

                        <div class="form-group row">
                            <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccionEdificio" placeholder="Ingrese la dirección del edificio"
                                    value={direccionEdificio}
                                    onChange={handledireccionEdificio} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Departamentos</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleDepartamentoSeleccionado} >
                                        <option value="" disabled selected>Seleccione un departamentos</option>

                                        {listaTodosDepartamentosDadoEdificio.map((departamento, index) => (
                                            <option key={index} value={departamento.id}>
                                                {departamento.id}
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
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso"
                                    value={piso}
                                    readOnly />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" 
                                    value={departamento} 
                                    readOnly/>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">DNI dueño</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" 
                                    value={dniDueño}
                                    readOnly />
                            </div>
                        </div>

                        <p></p>
                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">¿Está alquilado?</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" 
                                    value={estaAlquilado}
                                    readOnly />
                            </div>
                        </div>

                        <p></p>


                        {(estaAlquilado === "SI") && (
                            <div class="form-group row">
                                <label for="Departamento" class="col-sm-2 col-form-label">DNI inquilino</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" 
                                        value={dniInquilino} 
                                        readOnly/>
                                </div>
                            </div>
                        )}

                        <p></p>
                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Nuevo Piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso"
                                    onChange={handleNuevoPiso}
                                    value={pisoNuevo} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Mod Departamento</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre de la unidad"
                                    onChange={handleNuevoDepartamento}
                                    value={departamentoNuevo} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Mod DNI dueño</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el DNI del dueño"
                                    onChange={handleNuevoDniDueño}
                                    value={dniDueñoNuevo} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Mod ¿Está alquilado?</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleNuevoEstaAlquilado}>
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
                                <label for="Departamento" class="col-sm-2 col-form-label">Mod DNI inquilino</label>
                                <div class="col-sm-10">
                                    <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el DNI del inquilino"
                                        onChange={handleNuevoDniInquilino}
                                        value={dniInquilinoNuevo} />
                                </div>
                            </div>
                        )}

                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-10 d-flex justify-content-center">
                                <button type="submit" className="mx-5">Registrar departamento</button>
                                <button onClick={handleEliminarDepartamento} className="mx-5">Eliminar Departamento</button>
                            </div>
                        </div>
                    </form>
                )
            }
        </div >
    );
}

export default ConsultarDepartamentos;