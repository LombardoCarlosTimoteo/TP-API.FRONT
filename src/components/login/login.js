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
        
        var URL =  "http://localhost:8080/auth/login"
        var data = { username: nombreUsuario,
            password: contraseña };
        fetch(URL, {
            //mode: "no-cors",
            headers:
            {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(data)
            
        })
        .then(response => {
            //console.log(response)
            if(!response.ok)
            {
                alert("Usuario o contraseña incorrecto")
                inicioValido = false
                throw new Error("datos invalidos")
            }
            inicioValido = true
            return response.text()
        })
/*          .then(response => {//response.text()
            console.log(response)
        } 
         ) */ 
        .then(response => {
            inicioValido = true
            //console.log(JSON.parse(response.json()))
            setdatosCorrectos(true)
            //console.log(response.text())
            setUserData({nombre_usuario: nombreUsuario,  token: response })
            
        
            console.log("token: ", userData.token)
            console.log("nombreUsuario: ", userData.nombre_usuario)
            
        })
        .catch(error => console.log("Error: ", error))

        
        //console.log("inicioValido: ",inicioValido)
        //console.log("datosCorrectos: ",datosCorrectos)

    }
    const handleUsuarioChange = (event) => {
        setNombreUSuario(event.target.value);
//        setUserData({...userData,nombre_usuario: nombreUsuario, token: "2"})
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
                {datosCorrectos ? (

                    <div className="header">
                        <h1>
                            {userData.nombre_usuario} estás en una sesión
                            {userData.token}
                            
                        </h1>
                        <button onClick={handleCerrarSesion} className="session-button">Cerrar Sesión</button>
                    </div>
                ) : (
                    <form className= "loginForm" onSubmit={handleSubmit}>
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