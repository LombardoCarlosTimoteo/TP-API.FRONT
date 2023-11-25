import React from 'react';
import { Link } from 'react-router-dom';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import './navbar2.css'; 
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
          

{userData.nombre_usuario === "" && (
          <li className="nav-item">
            <Link to="/signup" className="nav-link">Registrarse</Link>
          </li>
)}
{userData.nombre_usuario !== "" && (
          <NavDropdown title="Reclamar" id="basic-nav-dropdown" className="bg-primary-custom">
            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
                <Link to="/reclamoComun" className="nav-link1 text-primary-custom">Reclamo común</Link>
              </NavDropdown.Item>
            )}

            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
                <Link to="/reclamoParticular" className="nav-link1 text-primary-custom">Reclamo particular</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
            )}
{userData.nombre_usuario !== "" && (
          <NavDropdown title="Consultar" id="basic-nav-dropdown" className="bg-primary-custom">
            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/consultarReclamoComun" className="nav-link1 text-primary-custom">Reclamo común</Link>
              </NavDropdown.Item>
            )}

            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/consultarReclamoParticular" className="nav-link1 text-primary-custom">Reclamo particular</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
            )}

          {userData.tipoUsuario === "ADMIN" && (
          <NavDropdown title="Edificios" id="basic-nav-dropdown" className="bg-primary-custom">
            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/registrarEdificio" className="nav-link1 text-primary-custom">Registrar</Link>
              </NavDropdown.Item>
            )}

            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/consultarEdificio" className="nav-link1 text-primary-custom">Consultar</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
            )}

          {userData.tipoUsuario === "ADMIN" && (
          <NavDropdown title="Departamentos" id="basic-nav-dropdown" className="bg-primary-custom">
            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/registrarDepartamentos" className="nav-link1 text-primary-custom">Registrar</Link>
              </NavDropdown.Item>
            )}

            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/consultarDepartamentos" className="nav-link1 text-primary-custom">Consultar</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
            )}

            {userData.tipoUsuario === "ADMIN" && (
          <NavDropdown title="Usuarios" id="basic-nav-dropdown" className="bg-primary-custom">
            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/signup" className="nav-link1 text-primary-custom">Crear</Link>
              </NavDropdown.Item>
            )}

            {userData.nombre_usuario !== "" && (
              <NavDropdown.Item className="text-primary-custom">
              <Link to="/consultarUsuarios" className="nav-link1 text-primary-custom">Consultar</Link>
              </NavDropdown.Item>
            )}
          </NavDropdown>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default NavBar2;
