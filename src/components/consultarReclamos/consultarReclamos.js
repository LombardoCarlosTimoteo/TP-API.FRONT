

//ARCHIVO EN DESUSO

import React, { useState } from "react";
import './consultarReclamos.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
function ConsultarReclamos() {
    const [descripcion, setDescripcion] = useState("")
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const { userData, setUserData } = useContext(MyContext)
    const [lugarComun, setLugarComun] = useState("")
    const [estadoReclamo, setestadoReclamo] = useState("Abierto")
    const [nuevoEstadoReclamo, setnuevoEstadoReclamo] = useState("")
    const [filtrarPorEstadoChange, setfiltrarPorEstadoChange] = useState("")
    const [razonDeCambioDeEstado, setrazonDeCambioDeEstado] = useState("")

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const imagenes = [];
        for (let i = 0; i < archivos.length; i++) {
            imagenes.push(URL.createObjectURL(archivos[i]));
            console.log("va")
            console.log(archivos[i])
        }
        setimagenes(imagenes);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        console.log("Particular")
        console.log(descripcion)
        console.log(imagenes)
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else {
            //chequear que el usuario sea admin. si es admin, hacer el setdatoscorrectos
            setdatosCorrectos(true);
        }
        if(nuevoEstadoReclamo!==""){
            setestadoReclamo(nuevoEstadoReclamo)
            alert("Cambios reazados con exito")
        }

    }

    const handleReclamoChange = (event) => {
        setLugarComun(event.target.value)
    }
    const handleNuevoEstadoChange = (event) => {
        setnuevoEstadoReclamo(event.target.value)
    }
    const handlefiltrarPorEstadoChange = (event) => {
        setnuevoEstadoReclamo(event.target.value)
    }
    const handlerazonDeCambioDeEstado = (event) => {
        setrazonDeCambioDeEstado(event.target.value)
    }


    return (
        <div>

            {userData.tipoUsuario === "" && (
                <h1>Inicia sesión para consultar reclamos.</h1>

            )}
            {userData.tipoUsuario === "admin" && (
                <div>

                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Consultar reclamo siendo admin</h1>
                        <p></p>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Reclamos</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoChange}>
                                        <option value="" disabled selected>Seleccione un reclamo</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                    </select>
                                </div>
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
                                <p></p>

                            </div>
                        </div>

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
                                    <p></p>

                                </div>
                            </div>
                        </div>

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
                            <p></p>

                        </div>
                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Razón de cambio</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="razonDeCambioDeEstado" rows="3"
                                    value={razonDeCambioDeEstado}
                                    onChange={handlerazonDeCambioDeEstado}
           
                                    ></textarea>
                                <p></p>

                            </div>
                        </div>
                        <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="submit" >Realizar cambio de estado</button>
            </div>
          </div>
                    </form>

                </div>
            )}

            {(userData.tipoUsuario === "inquilino" ||userData.tipoUsuario === "dueño" ) && (
                <div>

                <form class="mx-auto" onSubmit={handleSubmit}>
                    <h1>Consultar reclamo siendo iniqulino o dueño</h1>
                    <p></p>

                    <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Filtrar por estado</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="Nuevo estado" name="Nuevo estado" onChange={handlefiltrarPorEstadoChange}>
                                        <option value="" disabled selected>Seleccione un estado</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Abierto">Abierto</option>
                                        <option value="En proceso">En proceso</option>
                                        <option value="Desestimado">Desestimado</option>
                                        <option value="Anulado">Anulado</option>
                                        <option value="Desestimado">Desestimado</option>
                                    </select>
                                </div>
                            </div>
                            <p></p>

                        </div>

                    <div class="form-group row">
                        <label class="col-sm-2 col-form-label">Reclamos</label>
                        <div class="col-sm-10">
                            <div class="custom-select">
                                <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoChange}>
                                    <option value="" disabled selected>Seleccione un reclamo</option>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <p></p>

                    <div class="form-group row">
                        <label for="nombre_usuario" class="col-sm-2 col-form-label">Estado</label>
                        <div class="col-sm-10">
                            <input
                                type="text" class="form-control" id="lugarComun" aria-describedby="lugarComun" placeholder="" value={estadoReclamo} readonly
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
                            <p></p>

                        </div>
                    </div>

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
                                <p></p>

                            </div>
                        </div>
                    </div>
                </form>

            </div>
            )}



        </div>
    );




}

export default ConsultarReclamos;