import React from "react";
import { useNavigate } from "react-router-dom";



function Seccion2() {
    const nav = useNavigate();
    function navegarAtras() {
        nav(-1);
    }
    return (

        <div>
            <h1>Seccion2</h1>
            <div>
                <button onClick={navegarAtras}>Atras</button>
            </div>
        </div>
    );
}

export default Seccion2;