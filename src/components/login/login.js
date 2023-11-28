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
        const habilitado = false;


        try {
            const loginResponse = await fetch("http://localhost:8080/auth/login", { //TOKEN
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
    
            const userLoginResponse = await fetch(`http://localhost:8080/auth/userLogin/${nombreUsuario}`, { //USUARIO ID
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
            const userID = userData.usuarioId;

    
            const contextResponse = await fetch(`http://localhost:8080/api/context/${userID}`, { //CONTEXT
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

            //const contextData = await contextResponse
            
    
            setUserData({
                ...userData,
                tipoUsuario: userData.tipoUsuario,
                usuarioID: userID,
                nombre_usuario: userData.username,
                token: token,
                departamento: contextData.unidadDepartamento,
                direccionEdificio: contextData.direccionEdificio,
                piso: contextData.pisoDepartamento,
                habilitadoReclamos: habilitado
            });
            setdatosCorrectos(true);
        } catch (error) {
            console.error("Error en el manejo de las promesas:", error);



            // Manejar el error según tus necesidades
        }
    };


    const handleUsuarioChange = (event) => {
        setNombreUSuario(event.target.value);

    }

    const handleContraseñaChange = (event) => {
        setContraseña(event.target.value);
    }
    const handleCerrarSesion = (event) => {
        setUserData({ ...userData, nombre_usuario: "",tipoUsuario:"", token: "", usuarioID:"",piso:"",departamento:"",direccionEdificio:""})
 
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