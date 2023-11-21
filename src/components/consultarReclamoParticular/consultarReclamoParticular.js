import React, { useState } from "react";
import './consultarReclamoParticular.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from 'react';

function ConsultarReclamoComun() {
    const [descripcion, setDescripcion] = useState("")
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const { userData, setUserData } = useContext(MyContext)
    const [estadoReclamo, setestadoReclamo] = useState("")
    const [nuevoEstadoReclamo, setnuevoEstadoReclamo] = useState("")
    const [filtrarPorEstado, setfiltrarPorEstadoChange] = useState("")
    const [listaReclamosParticulares, setlistaReclamosParticulares] = useState([]);
    const [tipoBusqueda, settipoBusqueda] = useState([]);
    const [numeroDeReclamo, setnumeroDeReclamo] = useState([]);
    const [listaReclamosPorFiltro, setlistaReclamosPorFiltro] = useState([]);
    const [medidasTomadasActual, setmedidasTomadasActual] = useState("");
    const [medidasTomadasNueva, setmedidasTomadasNueva,] = useState("");
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')

    //si es admin, cargar todos los reclamos en listaReclamosComunes
    //si no, cargar aquellos reclamos que correspondan en listaReclamosComunes

    useEffect(() => {
        if (userData.tipoUsuario === "ADMIN") { //si es admin, agarrar todos los reclamos comunes

            var URL = "http://localhost:8080/api/reclamosComunes"
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
                    JSON.stringify(response)
                    console.log(response)
                })
                .catch(error => console.log("Error: ", error))
        }

        else if (userData.tipoUsuario === "inquilino" || userData.tipoUsuario === "dueño") { //si es inquilino o dueño, agarrar los reclamos de su edificio que se encuentra en el context
            var URL = "http://localhost:8080/api/reclamosComunesDeUsuario/{idEdificio}" //idEdificio esta en el contexto
            var token = `Bearer ${userData.token}`// + userData.token
            console.log(token)
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
                    console.log(response)
                })
                .catch(error => console.log("Error: ", error))
        }

    })

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const imagenes = [];
        for (let i = 0; i < archivos.length; i++) {
            imagenes.push(URL.createObjectURL(archivos[i]));
        }
        setimagenes(imagenes);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else {
            //chequear que el usuario sea admin. si es admin, hacer el setdatoscorrectos
            setdatosCorrectos(true);
        }
        if (userData.tipoUsuario === "ADMIN") {
            if (nuevoEstadoReclamo !== "") {
                setestadoReclamo(nuevoEstadoReclamo)
                console.log("cambios en el reclamo")
                console.log("nuevoEstadoReclamo",nuevoEstadoReclamo)
            }
            if (medidasTomadasNueva !== "") setmedidasTomadasActual(medidasTomadasNueva)
        }
    }

    const handleReclamoFiltrado = (event) => {
        //esto se hace cuando se selecciona un reclamo dentro de lista de reclamos.
        const reclamoABuscar = event.target.value;
        const reclamoEncontrado = listaReclamosParticulares.find(reclamo => reclamo.numeroDeReclamo === reclamoABuscar);
        if (reclamoEncontrado) {
            setDescripcion(reclamoEncontrado.descripcion);
            setestadoReclamo(reclamoEncontrado.estado);
            setmedidasTomadasActual(reclamoEncontrado.medidasTomadas)
            setimagenes(reclamoEncontrado.imagenes);
        }
    }

    const handleNuevoEstadoChange = (event) => {
        setnuevoEstadoReclamo(event.target.value)
    }
    const handlefiltrarPorEstadoChange = (event) => {
        setfiltrarPorEstadoChange(event.target.value)
        const listaReclamosPorFiltro = listaReclamosParticulares.filter(reclamo => reclamo.estado === filtrarPorEstado);

    }
    const handleMedidasTomadasNueva = (event) => {
        setmedidasTomadasNueva(event.target.value)
    }
    const handleTipoBusqueda = (event) => {
        settipoBusqueda(event.target.value)
    }
    const handleNumeroDeReclamo = (event) => {
        setnumeroDeReclamo(event.target.value)
    }
    const handleEliminarReclamo = (event) => {
        console.log("eliminar el reclamo")
    }
    const handleRealizarBusqueda = (event) => {
        if (tipoBusqueda === "busquedaPorNumeroReclamo") {
            const reclamoEncontrado = listaReclamosParticulares.find(reclamo => reclamo.numero_reclamo === numeroDeReclamo);
            if (reclamoEncontrado) {
                setnuevoEstadoReclamo(reclamoEncontrado.estado);
                setDescripcion(reclamoEncontrado.descripcion);
                setimagenes(reclamoEncontrado.imagenes);
            } 
        }
    }



    return (
        <div>
            {userData.tipoUsuario === "" && (
                <h1>Inicia sesión para consultar reclamos.</h1>

            )}
            {userData.tipoUsuario === "ADMIN" && (
                <div>
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Consultar reclamo particular siendo admin</h1>

                        <p></p>
                        <div class="form-group row">
                            <label for="tipoUsuario" class="col-sm-2 col-form-label">Tipo de búsqueda</label>

                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario1" value="busquedaPorNumeroReclamo" onChange={handleTipoBusqueda} />
                                    <label class="form-check-label" for="tipoUsuario1">Por número de reclamo</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario2" value="busquedaPorEstado" onChange={handleTipoBusqueda} />
                                    <label class="form-check-label" for="tipoUsuario2">Por estado de reclamo</label>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        {tipoBusqueda === "busquedaPorEstado" && (
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Filtrar por estado</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="Nuevo estado" name="Nuevo estado" onChange={handlefiltrarPorEstadoChange}>
                                            <option value="" disabled selected>Seleccione un estado</option>
                                            <option value="nuevo">Nuevo</option>
                                            <option value="abierto">Abierto</option>
                                            <option value="enProceso">En proceso</option>
                                            <option value="desestimado">Desestimado</option>
                                            <option value="anulado">Anulado</option>
                                            <option value="desestimado">Desestimado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {tipoBusqueda === "busquedaPorNumeroReclamo" && (
                            <div class="form-group row">
                                <label for="nombre_usuario" class="col-sm-2 col-form-label">Numero de reclamo</label>
                                <div class="col-sm-10">
                                    <input
                                        type="text" class="form-control" id="nombre_usuario" aria-describedby="nombre_usuario" placeholder="Ingrese el número de reclamo"
                                        onChange={handleNumeroDeReclamo}
                                        value={numeroDeReclamo} />
                                </div>
                            </div>
                        )}
                        <p></p>

                        {tipoBusqueda === "busquedaPorEstado" && (
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Reclamos</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoFiltrado}>
                                            <option value="" disabled selected>Seleccione un reclamo</option>
                                            {listaReclamosPorFiltro.map((reclamo, index) => (
                                                <option key={index} value={reclamo.numeroReclamo}>
                                                    {reclamo.numeroReclamo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Estado actual</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={estadoReclamo} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={direccionEdificio} readonly
                                />
                            </div>
                        </div>

                        <p></p>
                        
                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={piso} readonly
                                />
                            </div>
                        </div>
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={departamento} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Descripción</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="descripcionReclamo" rows="3"
                                    maxLength="200"
                                    readOnly
                                    value={descripcion}></textarea>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Medidas Tomadas</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="descripcionReclamo" rows="3"
                                    maxLength="200"
                                    readOnly
                                    value={medidasTomadasActual}></textarea>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="adjuntarImagenes" class="col-sm-2 col-form-label">Imágenes</label>
                            <div class="col-sm-10">
                                <div class="custom-file">
                                    <p></p>
                                    <div>
                                        {imagenes.map((imagen, index) => (
                                            <img key={index} src={imagen} alt={`Imagen ${index}`} width="100" />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Nuevo estado</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="Nuevo estado" name="Nuevo estado" onChange={handleNuevoEstadoChange}>
                                        <option value="" disabled selected>Seleccione el nuevo estado del reclamo</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Abierto">Abierto</option>
                                        <option value="En proceso">En proceso</option>
                                        <option value="Desestimado">Desestimado</option>
                                        <option value="Anulado">Anulado</option>
                                        <option value="Desestimado">Desestimado</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Medidas tomadas</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="razonDeCambioDeEstado" rows="3"
                                    value={medidasTomadasNueva}
                                    onChange={handleMedidasTomadasNueva}
                                ></textarea>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-1"></div>
                            <div className="col-sm-10 d-flex justify-content-center">
                                <button type="submit" className="mx-5">Realizar cambio de estado</button>
                                <button onClick={handleEliminarReclamo} className="mx-5">Eliminar reclamo común</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}
            {(userData.tipoUsuario === "INQUILINO" || userData.tipoUsuario === "DUENIO") && (
                <div>

                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Consultar reclamo particular siendo iniqulino o dueño</h1>

                        <p></p>

                        <div class="form-group row">
                            <label for="tipoUsuario" class="col-sm-2 col-form-label">Tipo de búsqueda</label>

                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario1" value="busquedaPorNumeroReclamo" onChange={handleTipoBusqueda} />
                                    <label class="form-check-label" for="tipoUsuario1">Por número de reclamo</label>
                                </div>
                                <div class="form-check">
                                    <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario2" value="busquedaPorEstado" onChange={handleTipoBusqueda} />
                                    <label class="form-check-label" for="tipoUsuario2">Por estado de reclamo</label>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        {tipoBusqueda === "busquedaPorEstado" && (
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Filtrar por estado</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="Nuevo estado" name="Nuevo estado" onChange={handlefiltrarPorEstadoChange}>
                                            <option value="" disabled selected>Seleccione un estado</option>
                                            <option value="nuevo">Nuevo</option>
                                            <option value="abierto">Abierto</option>
                                            <option value="enProceso">En proceso</option>
                                            <option value="desestimado">Desestimado</option>
                                            <option value="anulado">Anulado</option>
                                            <option value="desestimado">Desestimado</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}

                        {tipoBusqueda === "busquedaPorNumeroReclamo" && (
                            <div class="form-group row">
                                <label for="nombre_usuario" class="col-sm-2 col-form-label">Numero de reclamo</label>
                                <div class="col-sm-10">
                                    <input
                                        type="text" class="form-control" id="nombre_usuario" aria-describedby="nombre_usuario" placeholder="Ingrese el número de reclamo"
                                        onChange={handleNumeroDeReclamo}
                                        value={numeroDeReclamo} />
                                </div>
                            </div>
                        )}
                        <p></p>

                        {tipoBusqueda === "busquedaPorEstado" && (
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Reclamos</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoFiltrado}>
                                            <option value="" disabled selected>Seleccione un reclamo</option>
                                            {listaReclamosPorFiltro.map((reclamo, index) => (
                                                <option key={index} value={reclamo.dni}>
                                                    {reclamo.numeroReclamo}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Estado actual</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={estadoReclamo} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={direccionEdificio} readonly
                                />
                            </div>
                        </div>

                        <p></p>
                        
                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={piso} readonly
                                />
                            </div>
                        </div>
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={departamento} readonly
                                />
                            </div>
                        </div>

                        <p></p>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Descripción</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="descripcionReclamo" rows="3"
                                    maxLength="200"
                                    readOnly
                                    value={descripcion}></textarea>
                            </div>
                        </div>

                        <p></p>


                        <div class="form-group row">
                            <label for="adjuntarImagenes" class="col-sm-2 col-form-label">Imágenes</label>
                            <div class="col-sm-10">
                                <div class="custom-file">
                                    <p></p>
                                    <div>
                                        {imagenes.map((imagen, index) => (
                                            <img key={index} src={imagen} alt={`Imagen ${index}`} width="100" />
                                        ))}
                                        <p></p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Medidas Tomadas</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="descripcionReclamo" rows="3"
                                    maxLength="200"
                                    readOnly
                                    value={medidasTomadasActual}></textarea>
                            </div>
                        </div>
                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-10">
                                <button onClick={handleRealizarBusqueda} >Realizar búsqueda</button>
                            </div>
                        </div>
                    </form>

                </div>
            )}
        </div>
    );
}

export default ConsultarReclamoComun;