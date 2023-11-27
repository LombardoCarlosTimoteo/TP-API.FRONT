import React, { useState } from "react";
import './consultarDepartamento.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import edificiosData from './edificios.json';
import { useEffect } from 'react';

function ConsultarDepartamentos() {
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [nombreUsuarioDueño, setnombreUsuarioDueño] = useState('')
    const [nombreUsuarioInquilino, setnombreUsuarioInquilino] = useState('')
    const [estaAlquilado, setestaAlquilado] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const { userData, setUserData } = useContext(MyContext)
    const [listaTodosDepartamentos, setListaTodosDepartamentos] = useState([]); //lista de todos los edificios
    const [listaTodosDepartamentosDadoEdificio, setlistaTodosDepartamentosDadoEdificio] = useState([])
    const [departamentoBuscado, setDepartamentoBuscado] = useState([])
    const [idDepartamento, setidDepartamento] = useState([])

    

    const [pisoNuevo, setpisoNuevo] = useState("")
    const [departamentoNuevo, setdepartamentoNuevo] = useState("")
    const [direccionEdificioNuevo, setdireccionEdificioNuevo] = useState('')
    const [nombreUsuarioDueñoNuevo, setnombreUsuarioDueñoNuevo] = useState('')
    const [nombreUsuarioInquilinoNuevo, setnombreUsuarioInquilinoNuevo] = useState('')
    const [estaAlquiladoNuevo, setestaAlquiladoNuevo] = useState('')
    const departamentoSeleccionado = "";


    const handleOtroDepartamento = (event) => {
        setdatosCorrectos(false);
        setPiso("")
        setDepartamento("")
        setDireccionEdificio("")
        setestaAlquilado("")
    }

    const handleRealizarCambios = (event) => {
        event.preventDefault();
        
        if (estaAlquiladoNuevo === "NO") {
            setnombreUsuarioInquilinoNuevo(null)
        }


        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if (userData.tipoUsuario === "ADMIN") {
            var URL = `http://localhost:8080/api/departamentos/${idDepartamento}`
            var token = `Bearer ${userData.token}`

            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                    'Content-Type': 'application/json',

                }),
                method: "PUT",
                body: JSON.stringify({
                    "usernameDuenio": nombreUsuarioDueñoNuevo,
                    "usernameInquilino": nombreUsuarioInquilinoNuevo
                })
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo hacer el PUT")
                    }
                    return response.json()
                })
                .then(response => {
                    alert("Se ha modificado el departamento")
                })
                .catch(error => console.log("Error: ", error))
            
        }
        else alert("No tienes permisos de administrador")
    }

    const handledireccionEdificio = (event) => {
        setDireccionEdificio(event.target.value)
    }

    const handleNuevoPiso = (event) => {
        setpisoNuevo(event.target.value)
    }
    const handleNuevoDepartamento = (event) => {
        setdepartamentoNuevo(event.target.value)
    }

    const handleNuevoEstaAlquilado = (event) => {
        setestaAlquiladoNuevo(event.target.value)
    }
    const handleEliminarDepartamento = (event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") alert("No has iniciado sesión")
        else if (userData.tipoUsuario === "ADMIN") {
            var URL = `http://localhost:8080/api/departamentos/${idDepartamento}`
            var token = `Bearer ${userData.token}`
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,

                }),
                method: "DELETE"
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error("No se pudo hacer el DELETE")
                    }
                    return alert("Se ha eliminado el departamento")
                })
                .catch(error => console.log("Error: ", error))
        }
        else alert("No tienes permisos de administrador")
    }

    const handleDepartamentoSeleccionado = (event) => {
        const idDepartamentoABuscar = event.target.value;
        const departamentoEncontrado = listaTodosDepartamentosDadoEdificio.find(departamento => departamento === idDepartamentoABuscar);
        console.log("idDepartamentoABuscar", idDepartamentoABuscar)
        setDepartamento(idDepartamentoABuscar)

        if (departamentoEncontrado) {
            console.log("aaaa:", idDepartamentoABuscar);
        }
    }


    const handleEdificioChange = (event) => {
        const idEdificioABuscar = event.target.value;
        const edificioEncontrado = listaTodosDepartamentos.find(edificio => edificio.id === parseInt(idEdificioABuscar, 10));
        const departamentos = edificioEncontrado.listaUnidades
        console.log("departamentos", departamentos)
        setlistaTodosDepartamentosDadoEdificio(departamentos)
        console.log("listaTodosDepartamentosDadoEdificio", listaTodosDepartamentosDadoEdificio)
    }

    const handlePiso = (event) => {
        setPiso(event.target.value)
    }

    const handleDepartamento = (event) => {
        setDepartamento(event.target.value)
    }
    
    const handleBuscarDepartamento = (event) => {
        event.preventDefault();
        var duenioId
        var inquilinoId
        

        if (userData.tipoUsuario === "ADMIN") {
            var URL = `http://localhost:8080/api/departamentos/${direccionEdificio}/${piso}/${departamento}`
            var token = `Bearer ${userData.token}`
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
                    duenioId = response.duenioId
                    inquilinoId = response.inquilinoId
                    setidDepartamento(response.id)
                }) 
                .then(response => { //buscar dueño
                var URL = `http://localhost:8080/auth/userLogin/id/${duenioId}`
                var token = `Bearer ${userData.token}`
                fetch(URL, {
                    headers: new Headers({
                        'Authorization': token,

                    }),
                    method: "GET"
                })
                    .then(response => {
                        if (!response.ok) {
                            setnombreUsuarioDueño("NO APLICA")
                            throw new Error("No se pudo hacer el GET")
                        }
                        return response.json()
                    })
                    .then(response => {
                        setnombreUsuarioDueño(response.username)
                        
                    })
                    .catch(error => console.log("Error: ", error))
                })
                .catch(error => console.log("Error: ", error))
                
                
                .then(response => {//buscar inquilino
                    
                    var URL = `http://localhost:8080/auth/userLogin/id/${inquilinoId}`
                    fetch(URL, {    
                    headers: new Headers({
                        'Authorization': token,

                    }),
                    method: "GET"
                })
                    .then(response => {
                        if (!response.ok) {
                            setestaAlquilado("NO")
                            setnombreUsuarioInquilino("NO APLICA")
                            throw new Error("No se pudo hacer el GET")
                        }
                        return response.json()
                    })
                    .then(response => {
                        if (inquilinoId !== null) setestaAlquilado("SI")
                        else{setestaAlquilado("NO")}
                        setnombreUsuarioInquilino(response.username)
                    })
                    .catch(error => console.log("Error: ", error))
            })
        }
    }

    const handleNombreUsuarioDueñoNuevo = (event) => {
        setnombreUsuarioDueñoNuevo(event.target.value)
    }
    const handleNombreUsuarioInquilinoNuevo = (event) => {
        setnombreUsuarioInquilinoNuevo(event.target.value)
    }

    return (
        <div>

            <form class="mx-auto">
                <h1>Formulario consultar departamento</h1>

                <p></p>

                <div class="form-group row" onSubmit={handleRealizarCambios}>
                    <label for="Piso" class="col-sm-2 col-form-label">Direccion edificio</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Piso" aria-describedby="Piso"
                            value={direccionEdificio} onChange={handledireccionEdificio}
                        />
                    </div>
                </div>

                <p></p>


                <div class="form-group row">
                    <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Piso" aria-describedby="Piso"
                            value={piso}
                            onChange={handlePiso}
                        />
                    </div>
                </div>

                <p></p>

                <div class="form-group row">
                    <label for="Piso" class="col-sm-2 col-form-label">Departamento</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Piso" aria-describedby="Piso"
                            value={departamento}
                            onChange={handleDepartamento}
                        />
                    </div>
                </div>

                <p></p>

                <div class="form-group row">
                    <label for="Departamento" class="col-sm-2 col-form-label">Nombre usuario Dueño</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Departamento" aria-describedby=""
                            value={nombreUsuarioDueño}
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
                        <label for="Departamento" class="col-sm-2 col-form-label">Nombre Usuario Inquilino</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Departamento" aria-describedby=""
                                value={nombreUsuarioInquilino}
                                readOnly />
                        </div>
                    </div>
                )}

                <p></p>

                <div class="form-group row">
                    <label for="Departamento" class="col-sm-2 col-form-label">Mod Nombre Usuario dueño</label>
                    <div class="col-sm-10">
                        <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre del dueño"
                            onChange={handleNombreUsuarioDueñoNuevo}
                            value={nombreUsuarioDueñoNuevo} />
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

                {(estaAlquiladoNuevo === "SI") && (
                    <div class="form-group row">
                        <label for="Departamento" class="col-sm-2 col-form-label">Mod nombre usuario inquilino</label>
                        <div class="col-sm-10">
                            <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el nombre de usuario del inquilino"
                                onChange={handleNombreUsuarioInquilinoNuevo}
                                value={nombreUsuarioInquilinoNuevo} />
                        </div>
                    </div>
                )}

                <p></p>

                <div class="form-group row">
                    <div class="col-sm-1"></div>
                    <div className="col-sm-10 d-flex justify-content-center">
                        <button onClick={handleBuscarDepartamento} className="mx-5">Realizar búsqueda</button>
                        <button onClick={handleRealizarCambios} className="mx-5">Realizar cambios</button>
                        <button onClick={handleEliminarDepartamento} className="mx-5">Eliminar Departamento</button>
                    </div>
                </div>
            </form>

        </div >
    );
}

export default ConsultarDepartamentos;