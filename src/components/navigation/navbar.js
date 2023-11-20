//Este archivo no se usa


import React from "react";
import { Link } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function Navbar() {
  return (
    <div>

      <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
        <a class="navbar-brand" href="/home">TP-API GRUPO 13</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="/home">Home <span class="sr-only"></span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/reclamoComun">Reclamo común</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/reclamoParticular">Reclamo particular</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/login">Iniciar Sesión</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="/signup">Registrarse</a>
            </li>

          </ul>
        </div>
      </nav>
    </div>

  );
}

export default Navbar;