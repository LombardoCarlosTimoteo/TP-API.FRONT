import React, { useState } from "react";
import './consultarEdificios.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import usuariosData from './Usuarios.json'; 
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
    
    const [edificios, setEdificios] = useState([]);
    const [direccionEdificioABuscar, setdireccionEdificioABuscar] = useState('')

    //aca hacer la carga de todos los jsons
    useEffect(() => {
        setEdificios(usuariosData);
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else {
            //chequear que el usuario sea admin. si es admin, hacer el setdatoscorrectos
            setdatosCorrectos(true);
            if(nuevaDireccion!==""){
                setDireccion(nuevaDireccion)
            }
            if(nuevacantidadDepartamentos!==""){
                setcantidadDepartamentos(nuevacantidadDepartamentos)
            }
            if(nuevacantidadPisos!==""){
                setcantidadPisos(nuevacantidadPisos)
            }
        }

    }

   
    const handlenuevaDireccion = (event) => {
        setnuevaDireccion(event.target.value)
    }
    const handlenuevacantidadDepartamentos = (event) => {
        setnuevacantidadDepartamentos(event.target.value)
    }
    const handlenuevacantidadPisos= (event) => {
        setnuevacantidadPisos(event.target.value)
    }

    const handleEdificioChange = (event) => {
        setdireccionEdificioABuscar(event.target.value)

        for (let i = 0; i < edificios.length; i++) {
            if (edificios[i].direccion === direccionEdificioABuscar) {
                setdireccionEdificioABuscar(edificios[i]);
                
            }
        }
    }

    return (
        <div>

            {userData.tipoUsuario === "" && (
                <h1>Inicia sesión para consultar reclamos.</h1>

            )}
            {userData.tipoUsuario === "admin" && (
                <div>

                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Consultar edificios</h1>
                        <p></p>
                        <div class="form-group row">
                            <label class="col-sm-2 col-form-label">Edificios</label>
                            <div class="col-sm-10">
                                <div class="custom-select">
                                    <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleEdificioChange}>
                                        <option value="" disabled selected>Seleccione un edificio</option>
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

                                    placeholder="Ingrese la dirección del edificio nuevamente para modificar"   />
                            </div>
                        </div>
                        <p></p>
                    


                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Mod cant. pisos</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="estadoReclamo" aria-describedby="estadoReclamo" placeholder="Ingrese la camtidad de pisos del edificio nuevamente para modificar"  
                                    value={nuevacantidadPisos} 
                                    onChange={handlenuevacantidadPisos}
                              />
                            </div>
                        </div>



                        <p></p>
                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Mod Deptos x piso</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="ewq" aria-describedby="estadoRsdfsfdfeclamo" placeholder="Ingrese la cantidad de dpartamentos por piso del edificio nuevamente para modificar"  
                                    value={nuevacantidadDepartamentos} 
                                    onChange={handlenuevacantidadDepartamentos}
                                />
                            </div>
                        </div>
                        <p></p>

                        <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="submit" >Realizar cambios </button>
            </div>
          </div>
                    </form>

                </div>
            )}



        </div>
    );




}

export default ConsultarEdificios;