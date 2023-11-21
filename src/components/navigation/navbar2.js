import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
const NavBar2 = () => {
  const { userData, setUserData } = useContext(MyContext)

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="collapse navbar-collapse" id="navbarNav">

        <a className="navbar-brand">
          <Link to="/" className="nav-link">TP-API GRUPO 13</Link>
        </a>

        <ul className="navbar-nav">

          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>

          <li className="nav-item">
            <Link to="/login" className="nav-link">Sesión</Link>
          </li>

          <li className="nav-item">
            <Link to="/signup" className="nav-link">Registrarse</Link>
          </li>

          {userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/reclamoComun" className="nav-link">Reclamo común</Link>
            </li>
          )}

          {userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/reclamoParticular" className="nav-link">Reclamo particular</Link>
            </li>
          )}

          {userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/consultarReclamoComun" className="nav-link">Consultar reclamo común</Link>
            </li>
          )}

          {userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/consultarReclamoParticular" className="nav-link">Consultar reclamo particular</Link>
            </li>
          )}

          {userData.tipoUsuario === "ADMIN" && userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/registrarEdificio" className="nav-link">Registrar edificio</Link>
            </li>
          )}

          {userData.tipoUsuario === "ADMIN" && userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/registrarDepartamentos" className="nav-link">Consultar departamentos</Link>
            </li>
          )}
          {userData.tipoUsuario === "ADMIN" && userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/consultarEdificio" className="nav-link">Consultar edificios</Link>
            </li>
          )}

          {userData.tipoUsuario === "ADMIN" && userData.nombre_usuario !== "" && (
            <li className="nav-item">
              <Link to="/consultarUsuarios" className="nav-link">Consultar usuarios</Link>
            </li>
          )}


        </ul>
      </div>
    </nav>
  );
};

export default NavBar2;
