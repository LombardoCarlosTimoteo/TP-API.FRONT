import React from "react";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import './home.css';
import { Link } from 'react-router-dom';
import Login from "../login/login";
import SignUp from "../SignUp/signUp";

function Home() {
    const { userData } = useContext(MyContext)
    return (
        <div>
            {userData.nombre_usuario === "" ? (
                <div className="header">
                <h1>Bienvenido, inicie sesión o regístrese.
                    
                </h1>
                <p></p>

                <Link to="/login">
        <button className="session-button">Iniciar Sesión</button>
      </Link>

                <p></p>
                <Link to="/signUp">
                <button className="session-button">Registrarse</button>
      </Link>

                    </div>
            ) : (
                <h1>Bienvenido {userData.nombre_usuario}</h1>
            )}

        </div>
    );
}

export default Home;