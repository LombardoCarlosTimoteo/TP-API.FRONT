import React, { useState } from "react";
import './consultarReclamoComun.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from 'react';
import reclamos from "./reclamos.json"

function ConsultarReclamoComun() {
    const [descripcion, setDescripcion] = useState("")
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const { userData, setUserData } = useContext(MyContext)
    const [lugarComun, setLugarComun] = useState("")
    const [estadoReclamo, setestadoReclamo] = useState("")
    const [nuevoEstadoReclamo, setnuevoEstadoReclamo] = useState("")
    const [filtrarPorEstado, setfiltrarPorEstadoChange] = useState("")
    const [listaReclamosComunes, setlistaReclamosComunes] = useState([]);
    const [tipoBusqueda, settipoBusqueda] = useState([]);
    const [numeroDeReclamo, setnumeroDeReclamo] = useState([]);
    const [listaReclamosPorFiltro, setlistaReclamosPorFiltro] = useState([]);
    const [medidasTomadasActual, setmedidasTomadasActual] = useState("");
    const [medidasTomadasNueva, setmedidasTomadasNueva,] = useState("");
    const [listaTodosReclamos, setlistaTodosReclamos,] = useState([]);
    const [idReclamo, setidReclamo,] = useState([]);
    const [nuevoEstadoSeleccionado, setNuevoEstadoSeleccionado,] = useState([]);
    const reclamoSeleccionado = "";
    const estadoNuevoSeleccionado = "";

    useEffect(() => {
        setlistaTodosReclamos(reclamos)
    })
    //si es admin, cargar todos los reclamos en listaReclamosComunes
    //si no, cargar aquellos reclamos que correspondan al edificio del usuario en listaReclamosComunes tambien
    useEffect(() => {
        if (userData.tipoUsuario === "ADMIN") { //si es admin, agarrar todos los reclamos comunes

            var URL = "http://localhost:8080/api/reclamos"
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
                    //console.log(response)
                    //JSON.stringify(response)
                    setlistaTodosReclamos(response);
                    console.log("listaTodosReclamos", listaTodosReclamos)
                })
                .catch(error => console.log("Error: ", error))
        }

        /*  else if (userData.tipoUsuario === "INQUILINO" || userData.tipoUsuario === "DUENIO") { //si es inquilino o dueño, agarrar los reclamos de su edificio que se encuentra en el context
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
         } */

    }, [])

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const imagenes = [];
        for (let i = 0; i < archivos.length; i++) {
            imagenes.push(URL.createObjectURL(archivos[i]));
        }
        setimagenes(imagenes);
    };

    const handleRealizarCambios = (event) => {
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
                console.log("nuevoEstadoReclamo", nuevoEstadoReclamo)
            }
            if (medidasTomadasNueva !== "") setmedidasTomadasActual(medidasTomadasNueva)
        }
        setnuevoEstadoReclamo("")
        setmedidasTomadasNueva("")
    }

    const handleReclamoFiltradosSeleccionado = (event) => {
        //esto se hace cuando se selecciona un reclamo dentro de lista de reclamos.
        const reclamoABuscar = event.target.value;
        console.log("reclamoABuscar", reclamoABuscar)

        const reclamoEncontrado = listaReclamosPorFiltro.find(reclamo => reclamo.id === parseInt(reclamoABuscar), 10);
        console.log("reclamoEncontrado.descripcion", reclamoEncontrado.descripcion)
        if (reclamoEncontrado) {
            setidReclamo(reclamoEncontrado.id);
            setestadoReclamo(reclamoEncontrado.estado);
            setLugarComun(reclamoEncontrado.lugarComun);
            setDescripcion(reclamoEncontrado.descripcion);
            setmedidasTomadasActual(reclamoEncontrado.medidasTomadas)
        }
    }

    const handleNuevoEstadoChange = (event) => {
        setnuevoEstadoReclamo(event.target.value)
    }
    const handlefiltrarPorEstadoSeleccionado = (event) => {
        setestadoReclamo("");
        setLugarComun("");
        setDescripcion("");
        setmedidasTomadasActual("");
        setidReclamo("");
        const filtroSeleccionado = event.target.value;
        const listaFiltrada = listaTodosReclamos.filter(reclamo => { return reclamo.estado === filtroSeleccionado && reclamo.tipoReclamo === "COMUN" })
        setlistaReclamosPorFiltro(listaFiltrada);

        console.log("\n\n\n")
        console.log("listaTodosReclamos", listaTodosReclamos)
        console.log("listaReclamosPorFiltro", listaReclamosPorFiltro)
        console.log("listaFiltrada", listaFiltrada)
        /* //setlistaReclamosPorFiltro([])

        while (listaReclamosPorFiltro.length > 0)
            listaReclamosPorFiltro.pop()

        //const lReclamosComunesPorFiltro = listaTodosReclamos.filter(reclamo => reclamo.estadoReclamo === filtrarPorEstado && reclamo.tipoReclamo === "COMUN");
        console.log("aca adentor todos reclamos", listaTodosReclamos)
        for (let i = 0; i < listaTodosReclamos.length; i++) {
            if (listaTodosReclamos[i].estadoReclamo === filtrarPorEstado && listaTodosReclamos[i].tipoReclamo === "COMUN") {
                console.log(listaTodosReclamos[i])
                listaReclamosPorFiltro.push(listaTodosReclamos[i])
            }
        }
        //setlistaReclamosPorFiltro(listaTodosReclamos.filter(reclamo => {return reclamo.estadoReclamo == filtrarPorEstado && reclamo.tipoReclamo == "COMUN"}))
        console.log("listaReclamosPorFiltro", listaReclamosPorFiltro) */
    }
    const handleMedidasTomadasNueva = (event) => {
        setmedidasTomadasNueva(event.target.value)
    }
    const handleTipoBusqueda = (event) => {
        setestadoReclamo("");
        setLugarComun("");
        setDescripcion("");
        setmedidasTomadasActual("");
        setidReclamo("");
        setnuevoEstadoReclamo("");
        setmedidasTomadasNueva("");
        settipoBusqueda(event.target.value)
    }
    const handleNumeroDeReclamo = (event) => {
        setnumeroDeReclamo(event.target.value)
    }
    const handleNuevoEstadoSeleccionado = (event) => {
        setNuevoEstadoSeleccionado(event.target.value)
        setnuevoEstadoReclamo(event.target.value)
    }
    const handleEliminarReclamo = (event) => {
        console.log("eliminar el reclamo")
    }
    const handleRealizarBusqueda = (event) => {
        if (tipoBusqueda === "busquedaPorNumeroReclamo") {
            const reclamoEncontrado = listaTodosReclamos.find(reclamo => { return reclamo.id === parseInt(numeroDeReclamo, 10) && reclamo.tipoReclamo === "COMUN" })
            if (reclamoEncontrado) {
                setestadoReclamo(reclamoEncontrado.estado);
                setLugarComun(reclamoEncontrado.lugarComun);
                setDescripcion(reclamoEncontrado.descripcion);
                //setimagenes(reclamoEncontrado.imagenes);
                setidReclamo(reclamoEncontrado.id)
                setmedidasTomadasActual(reclamoEncontrado.medidasTomadas)
            }
            else{
                alert("No existe el reclamo buscado")
                setestadoReclamo("");
                setLugarComun("");
                setDescripcion("");
                //setimagenes(reclamoEncontrado.imagenes);
                setidReclamo("");
                setmedidasTomadasActual("");
            }
        }
        else {

            const listaReclamosPorFiltro = listaReclamosComunes.filter(reclamo => reclamo.estado === filtrarPorEstado);
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
                        <h1>Consultar reclamo común</h1>

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
                                        <select class="form-control" id="estado" name="estado" onChange={handlefiltrarPorEstadoSeleccionado}>
                                            <option value="" disabled selected>Seleccione un estado</option>
                                            <option value="NUEVO">Nuevo</option>
                                            <option value="ABIERTO">Abierto</option>
                                            <option value="EN_PROCESO">En proceso</option>
                                            <option value="DESESTIMADO">Desestimado</option>
                                            <option value="ANULADO">Anulado</option>
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
                                <label class="col-sm-2 col-form-label">Lista de reclamos</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select
                                            class="form-control"
                                            id="lugarComun"
                                            name="lugarComun"
                                            onChange={handleReclamoFiltradosSeleccionado}
                                            value={reclamoSeleccionado || ""}
                                        >
                                            <option value="" disabled>
                                                {reclamoSeleccionado ? "Reclamo seleccionado" : "Seleccione un reclamo"}
                                            </option>
                                            {listaReclamosPorFiltro.map((reclamo, index) => (
                                                <option key={index} value={reclamo.id}>
                                                    {reclamo.id}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        )}
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">ID Reclamo común</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={idReclamo} readonly
                                />
                            </div>
                        </div>

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
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Lugar común</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={lugarComun} readonly
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
                                        <select
                                            class="form-control"
                                            id="lugarComun"
                                            name="lugarComun"
                                            onChange={handleNuevoEstadoSeleccionado}
                                            value={estadoNuevoSeleccionado || ""}
                                        >
                                            <option value="" disabled>
                                                {estadoNuevoSeleccionado ? "Nuevo estado seleccionado" : "Seleccione un nuevo estado"}
                                            </option>
                                                <option value="" disabled selected>Seleccione un estado</option>
                                                <option value="NUEVO">Nuevo</option>
                                                <option value="ABIERTO">Abierto</option>
                                                <option value="EN_PROCESO">En proceso</option>
                                                <option value="DESESTIMADO">Desestimado</option>
                                                <option value="ANULADO">Anulado</option>
                                           
                                        </select>
                                    </div>
                                </div>
                            </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Nuevo estado seleccionado</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={nuevoEstadoReclamo} readonly
                                />
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
                                {tipoBusqueda === "busquedaPorNumeroReclamo" && (<button onClick={handleRealizarBusqueda} className="mx-5">Realizar búsqueda</button>)}
                                <button onClick={handleRealizarCambios}  className="mx-5">Realizar cambios</button>
                                <button onClick={handleEliminarReclamo} className="mx-5">Eliminar reclamo común</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}










            {(userData.tipoUsuario === "INQUILINO" || userData.tipoUsuario === "DUENIO") && (
               <div>
               <form class="mx-auto" onSubmit={handleRealizarCambios}>
                   <h1>Consultar reclamo común</h1>

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
                                   <select class="form-control" id="estado" name="estado" onChange={handlefiltrarPorEstadoSeleccionado}>
                                       <option value="" disabled selected>Seleccione un estado</option>
                                       <option value="NUEVO">Nuevo</option>
                                       <option value="ABIERTO">Abierto</option>
                                       <option value="EN_PROCESO">En proceso</option>
                                       <option value="DESESTIMADO">Desestimado</option>
                                       <option value="ANULADO">Anulado</option>
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
                           <label class="col-sm-2 col-form-label">Lista de reclamos</label>
                           <div class="col-sm-10">
                               <div class="custom-select">
                                   <select
                                       class="form-control"
                                       id="lugarComun"
                                       name="lugarComun"
                                       onChange={handleReclamoFiltradosSeleccionado}
                                       value={reclamoSeleccionado || ""}
                                   >
                                       <option value="" disabled>
                                           {reclamoSeleccionado ? "Reclamo seleccionado" : "Seleccione un reclamo"}
                                       </option>
                                       {listaReclamosPorFiltro.map((reclamo, index) => (
                                           <option key={index} value={reclamo.id}>
                                               {reclamo.id}
                                           </option>
                                       ))}
                                   </select>
                               </div>
                           </div>
                       </div>
                   )}
                   <p></p>

                   <div class="form-group row">
                       <label for="nombre_usuario" class="col-sm-2 col-form-label">ID Reclamo común</label>
                       <div class="col-sm-10">
                           <input
                               type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="" value={idReclamo} readonly
                           />
                       </div>
                   </div>

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
                       <label for="nombre_usuario" class="col-sm-2 col-form-label">Lugar común</label>
                       <div class="col-sm-10">
                           <input
                               type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={lugarComun} readonly
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
                       <div class="col-sm-1"></div>
                       <div className="col-sm-10 d-flex justify-content-center">
                           {tipoBusqueda === "busquedaPorNumeroReclamo" && (<button onClick={handleRealizarBusqueda} className="mx-5">Realizar búsqueda</button>)}
                           
                       </div>
                   </div>
               </form>
           </div>
            )}
        </div>
    );
}

export default ConsultarReclamoComun;