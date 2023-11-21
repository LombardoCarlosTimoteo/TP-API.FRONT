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

    const handleSubmit = (event) => {

        event.preventDefault();
       
        //PROVISORIO
        setdatosCorrectos(true)
        setUserData({ ...userData, nombre_usuario: nombreUsuario })
        console.log("userData.tipoUsuario",userData.tipoUsuario)
        //PROVISORIO
        
        var URL = "http://localhost:8080/auth/login"
        var data = {
            username: nombreUsuario,
            password: contraseña
        };
        fetch(URL, {
            headers:
            {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)

        })
        .then(response => {
            //console.log(response)
            if (!response.ok) {
                alert("Usuario o contraseña incorrecto")
                inicioValido = false
                throw new Error("datos invalidos")
            }
            inicioValido = true
            return response.text()
        })
        .then(response => {
            setdatosCorrectos(true)

            setUserData({ ...userData, nombre_usuario: nombreUsuario, token: response })
            
            fetch("http://localhost:8080/api/contexto", {})



        })
        .catch(error => console.log("Error: ", error))




    }
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