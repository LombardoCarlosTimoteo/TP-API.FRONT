import React from "react";
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from "../Home/home";
import ReclamoComun from "../ReclamoComun/reclamoComun";
import Navbar from "./navbar";
import NavBar2 from "./navbar2";
import Login from "../login/login";
import ReclamoParticular from "../ReclamoParticular/reclamoParticular";
import SignUp from "../SignUp/signUp";
import RegistrarEdificio from "../registrarEdificio/registrarEdificio";
import ConsultarReclamos from "../consultarReclamos/consultarReclamos";
import ConsultarEdificios from "../consultarEdificios/consultarEdificios";
import ConsultarUsuarios from "../consultarUsuarios/consultarUsuarios";
import ConsultarReclamoComun from "../consultarReclamoComun/consultarReclamoComun";
import ConsultarReclamoParticular from "../consultarReclamoParticular/consultarReclamoParticular";
import RegistrarDepartamentos from "../RegistrarDepartamentos/registrarDepartamentos";
import ConsultarDepartamentos from "../consultarDepartamento/consultarDepartamento";

function Navigation() {
    return (
        <Router>
            <div>
                <NavBar2 />
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/signup" element={<SignUp />}></Route>
                    <Route path="/" element={<Home />}></Route>
                    <Route path="/reclamoComun" element={<ReclamoComun />}></Route>
                    <Route path="/reclamoParticular" element={<ReclamoParticular />}></Route>
                    <Route path="/registrarEdificio" element={<RegistrarEdificio />}></Route>
                    <Route path="/consultarEdificio" element={<ConsultarEdificios />}></Route>
                    <Route path="/consultarReclamoComun" element={<ConsultarReclamoComun />}></Route>
                    <Route path="/consultarReclamoParticular" element={<ConsultarReclamoParticular />}></Route>
                    <Route path="/consultarUsuarios" element={<ConsultarUsuarios />}></Route>
                    <Route path="/registrarDepartamentos" element={<RegistrarDepartamentos />}></Route>
                    <Route path="/consultarDepartamentos" element={<ConsultarDepartamentos />}></Route>
                </Routes>
            </div>
        </Router>
    );
}
export default Navigation;
