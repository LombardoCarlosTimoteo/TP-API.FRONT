import React, { useState } from "react";
import './formLogin2.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { json } from "react-router-dom";

function Login() {
    const [nombreUsuario, setNombreUSuario] = useState('');
    const [contraseña, setContraseña] = useState('');
    const { datosCorrectos, setdatosCorrectos } = useContext(MyContext);
    const { userData, setUserData } = useContext(MyContext)

    
    var inicioValido
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        setdatosCorrectos(true);

        try {
            const loginResponse = await fetch("http://localhost:8080/auth/login", {
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                body: JSON.stringify({
                    username: nombreUsuario,
                    password: contraseña
                })
            });
    
            if (!loginResponse.ok) {
                alert("Usuario o contraseña incorrecto");
                return;
            }
    
            const token = await loginResponse.text();
    
            const userLoginResponse = await fetch(`http://localhost:8080/auth/userLogin/${nombreUsuario}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "GET"
            });
    
            if (!userLoginResponse.ok) {
                throw new Error("Datos de usuario inválidos");
            }
    
            const userData = await userLoginResponse.json();
            const userID = userData.usuario.id;
    
            const contextResponse = await fetch(`http://localhost:8080/api/context/${userID}`, {
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                method: "GET"
            });
    
            if (!contextResponse.ok) {
                throw new Error("Datos del contexto inválidos");
            }
    
            const contextData = await contextResponse.json();
            const listaDeptos = contextData.departamentos;
            console.log(contextData.departamentos)
            let deptoEncontradoID;
            for (let i = 0; i < listaDeptos.length; i++) {
                if(listaDeptos[i].duenio !== null || listaDeptos[i].inquilino !== null){
                    if (listaDeptos[i].duenio.id == parseInt(userID, 10)|| listaDeptos[i].inquilino.id == parseInt(userID, 10)) {
                        deptoEncontradoID = listaDeptos[i].id;
                        console.log("i es ", i)
                        console.log(deptoEncontradoID)
                        break; // Salimos del bucle una vez que encontramos el departamento
                    }
                }
            }
    
            setUserData({
                ...userData,
                tipoUsuario: userData.usuario.tipoUsuario,
                usuarioID: userID,
                nombre_usuario: userData.username,
                token: token,
                idEdificio: contextData.id,
                idDepto: deptoEncontradoID
            });
            setdatosCorrectos(true);
        } catch (error) {
            console.error("Error en el manejo de las promesas:", error);
            // Manejar el error según tus necesidades
        }
    };


/*     const handleSubmit = (event) => {

        event.preventDefault();
       
        //PROVISORIO
     setdatosCorrectos(true)
        setUserData({ ...userData, nombre_usuario: nombreUsuario })
        console.log("userData.tipoUsuario",userData.tipoUsuario) 
        //PROVISORIO
        var edificio
        var token
        var userID
        var URL = "http://localhost:8080/auth/login"
        var data = {
            username: nombreUsuario,
            password: contraseña
        };
        //HACEMOS LOGIN
        fetch(URL, {
            headers:
            {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)

        })
        .then(response => {
            if (!response.ok) {
                alert("Usuario o contraseña incorrecto")
                inicioValido = false
                throw new Error("datos invalidos")
            }
            inicioValido = true
            return response.text()
        })
        .then(response => {
            token = response
            setdatosCorrectos(true)
            setUserData({ ...userData, nombre_usuario: nombreUsuario, token: response })
            
        })
        .then(response =>{
            //OBTENEMOS EL USERID
            fetch(`http://localhost:8080/auth/userLogin/${nombreUsuario}`, {
                headers:
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method : "GET"
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("datos invalidos 1")
                }
                return response.json()
            })
            .then(response => {
                userID = response.usuario.id
                
            })
        
        .then(response => {
            fetch(`http://localhost:8080/api/context/19`, {
                headers:
            {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            method : "GET"
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("datos invalidos 23")
            }
            return response.json()
        })
        .then(response => {
            var listaDeptos = response
            console.log("listaDptos: " ,listaDeptos)
            var deptoEncontradoID   
            
            for (let i=0 ; i<listaDeptos.length(); i++){
                if (listaDeptos[i].duenio.id === userID || listaDeptos[i].inquilino.id === userID)
                    deptoEncontradoID = listaDeptos[i].id

            }
            setUserData({ ...userData, 
                tipoUsuario: response.usuario.tipoUsuario, 
                usuarioID: response.usuario.id, 
                nombre_usuario: response.username, 
                token: token, 
                idEdificio: response.id, 
                idDepto: deptoEncontradoID})
        }) */
        
        

        
        /*
        .then(response => {
            //HACEMOS EL LOG DE INICIO DE SESION DEL USUARIO
            var log = {
                nombre_usuario: nombreUsuario,
                fecha: new Date(),
                accion: "Inicio de sesión"
            }

            fetch("http://localhost:8080/edificios/context", {
                headers:
            {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(log)
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error("datos invalidos")
                }
                return response.text()
            })
        }) */
        //
        //.catch(error => console.log("Error: ", error))


    //}
    const handleUsuarioChange = (event) => {
        setNombreUSuario(event.target.value);

    }

    const handleContraseñaChange = (event) => {
        setContraseña(event.target.value);
    }
    const handleCerrarSesion = (event) => {
        setUserData({ ...userData, nombre_usuario: "" })
        console.log(userData.nombre_usuario)
        setdatosCorrectos(false);
        setNombreUSuario("")
        setContraseña("")
    }

    return (
        <body>
            <div>
                {datosCorrectos ? ( //Si el login es correcto muestra esto:

                    <div className="header">
                        <h1> {userData.nombre_usuario} estás en una sesión </h1>

                        <button onClick={handleCerrarSesion} className="session-button">Cerrar Sesión</button>
                    </div>
                ) : (
                    <form className="loginForm" onSubmit={handleSubmit}>
                        <div class="form-group row">
                            <label for="nombre_usuario" class="col-sm-2 col-form-label">Usuario</label>
                            <div class="col-sm-10">
                                <input
                                    type="text" class="form-control" id="nombre_usuario" aria-describedby="nombre_usuario" placeholder="Ingrese su nombre de usuario aquí"
                                    onChange={handleUsuarioChange}
                                    value={nombreUsuario} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="inputPassword" class="col-sm-2 col-form-label">Contraseña</label>
                            <div class="col-sm-10">
                                <input type="password" class="form-control" id="inputPassword" placeholder="Ingrese su contraseña aquí"
                                    onChange={handleContraseñaChange}
                                    value={contraseña} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <div class="col-sm-2"></div>
                            <div class="col-sm-10">
                                <button type="submit" >Iniciar sesión</button>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </body>
    );
}

export default Login;