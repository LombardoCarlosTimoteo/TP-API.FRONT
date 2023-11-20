import React, { useState } from "react";
import './consultarReclamoParticular.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from 'react';

function ConsultarReclamoParticular() {
    const [descripcion, setDescripcion] = useState("")
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [imagenes, setimagenes] = useState([]);
    const { userData, setUserData } = useContext(MyContext)
    const [direccionEdificio, setdireccionEdificio] = useState("")
    const [piso, setpiso] = useState("")
    const [departamento, setdepartamento] = useState("")
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

    useEffect(() => {
        if(userData.tipoUsuario === "admin"){ 
            var URL = "http://localhost:8080/api/reclamosParticulares"
            var token = `Bearer ${userData.token}`// + userData.token
            console.log(token)
            fetch(URL, {
    
                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            })
        }
        
        else if(userData.tipoUsuario === "inquilino" || userData.tipoUsuario === "dueño"){
            //aca va el fetch de los reclamos particulares del usuario cuando tengamos en el context el edificio con sus deptos
            var URL = "http://localhost:8080/api/reclamosParticulares"
            var token = `Bearer ${userData.token}`// + userData.token
            console.log(token)
            fetch(URL, {

                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            })
                .then(response => response.json())
        }
        
        
    })
    

        const handleSubmit = (event) => {
            event.preventDefault();
            if (userData.nombre_usuario === "") alert("No has iniciado sesión")
            else {
                //chequear que el usuario sea admin. si es admin, hacer el setdatoscorrectos
                setdatosCorrectos(true);
            }
            if (nuevoEstadoReclamo !== "") {
                setestadoReclamo(nuevoEstadoReclamo)
                alert("Cambios reazados con exito")
            }
        };

        const handleReclamoChange = (event) => {
            setdireccionEdificio(event.target.value)
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
                            <h1>Consultar reclamo particular siendo admin</h1>
                            <p></p>
                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Reclamos</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoChange}>
                                            <option value="" disabled selected>Seleccione un reclamo común</option>
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
                                <label for="nombre_usuario" class="col-sm-2 col-form-label">Dirección del edificio</label>
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
                                <label for="descripcionReclamo" class="col-sm-2 col-form-label">Razón de cambio</label>
                                <div class="col-sm-10">
                                    <textarea class="form-control" id="razonDeCambioDeEstado" rows="3"
                                        value={razonDeCambioDeEstado}
                                        onChange={handlerazonDeCambioDeEstado}
                                    ></textarea>
                                </div>
                            </div>
                            
                            <p></p>
                            
                            <div class="form-group row">
                                <div class="col-sm-2"></div>
                                <div class="col-sm-10">
                                    <button type="submit" >Realizar cambio de estado</button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}

                {(userData.tipoUsuario === "inquilino" || userData.tipoUsuario === "dueño") && (
                    <div>
                        <form class="mx-auto" onSubmit={handleSubmit}>
                            <h1>Consultar reclamo particular siendo admin</h1>

                            <p></p>

                            <div class="form-group row">
                                <label class="col-sm-2 col-form-label">Reclamos</label>
                                <div class="col-sm-10">
                                    <div class="custom-select">
                                        <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleReclamoChange}>
                                            <option value="" disabled selected>Seleccione un reclamo común</option>
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
                                <label for="nombre_usuario" class="col-sm-2 col-form-label">Dirección del edificio</label>
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
                        </form>
                    </div>
                )}
            </div>
        );
}

export default ConsultarReclamoParticular;