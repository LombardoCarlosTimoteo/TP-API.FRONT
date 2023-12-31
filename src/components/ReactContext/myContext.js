import React, { createContext, useState } from "react";
import Login from "../login/login";

const MyContext = createContext();

export const MyProvider = ({ children }) => {
    const [userData, setUserData] = useState({
        nombre_usuario: "",
        tipoUsuario: "",
        token: "",
        usuarioID:"",
        piso:"",
        departamento:"",
        direccionEdificio:"",
        habilitadoReclamos:""
    });
    const [datosCorrectos, setdatosCorrectos] = useState("");

    return (
        <MyContext.Provider value={{ userData, setUserData, datosCorrectos, setdatosCorrectos }}>
            {children}
        </MyContext.Provider>
    );

}

export default MyContext;