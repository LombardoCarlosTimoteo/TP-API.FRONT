


import React, { useState } from "react";
import './formSignUp.css';

function SignUp() {
  const [tipoUsuario, setTipoUsuario] = useState('');
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [dni, setdni] = useState('');
  const [contraseña, setContraseña] = useState('');
  const [confirmar, setconfirmar] = useState('');
  const [datosCorrectos, setdatosCorrectos] = useState(false);
  const [piso, setPiso] = useState("")
  const [departamento, setDepartamento] = useState("")
  const [direccionEdificio, setDireccionEdificio] = useState('')
  
  const handleOtroUsuario = (event) => {
    setdatosCorrectos(false)
    setTipoUsuario("")
    setNombre("")
    setApellido("")
    setdni("")
    setContraseña("")
    setconfirmar("")
    setPiso("")
    setDepartamento("")
    setDireccionEdificio("")
  }
  const handleSubmit = (event) => {
    event.preventDefault();
    contraseña === confirmar ? setdatosCorrectos(true) : setdatosCorrectos(false);

    console.log(tipoUsuario)
    console.log(nombre)
    console.log(apellido)
    console.log(dni)
    console.log(contraseña)
    console.log(confirmar)

  }
  const handleTipoUsuario = (event) => {
    setTipoUsuario(event.target.value);
  }
  const handleNombreChange = (event) => {
    setNombre(event.target.value);
  }
  const handleApellidohange = (event) => {
    setApellido(event.target.value);
  }
  const handleDni = (event) => {
    setdni(event.target.value);
  }
  const handleContraseñaChange = (event) => {
    setContraseña(event.target.value);
  }
  const handleconfirmarChange = (event) => {
    setconfirmar(event.target.value);
  }
  const handledireccionEdificio = (event) => {
    setDireccionEdificio(event.target.value)
  }

  const handlePiso = (event) => {
    setPiso(event.target.value)
  }
  const handleDepartamento = (event) => {
    setDepartamento(event.target.value)
  }
  return (
    <body>
      <div>
        {datosCorrectos ? (
          <div className="header">
          <h1>
              Usuario registrado
          </h1>
          <button onClick={handleOtroUsuario} className="session-button">Registrar otro usuario</button>
      </div>
        ) : (
          <form class="mx-auto" onSubmit={handleSubmit}>
            <h1>Formulario crear usuarios</h1>
            <p></p>
            <div class="form-group row">
              <label for="tipoUsuario" class="col-sm-2 col-form-label">Tipo de usuario</label>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario1" value="admin" onChange={handleTipoUsuario} />
                  <label class="form-check-label" for="tipoUsuario1">Admin</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario2" value="dueño" onChange={handleTipoUsuario} />
                  <label class="form-check-label" for="tipoUsuario2">Dueño</label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="tipoUsuario" id="tipoUsuario3" value="inquilino" onChange={handleTipoUsuario} />
                  <label class="form-check-label" for="tipoUsuario3">Inquilino</label>
                </div>
              </div>
              <p></p>

              <div class="form-group row">
                <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccion_Edificio" placeholder="Ingrese la dirección del edificio que le corresponde al usuario"
                    onChange={handledireccionEdificio}
                    value={direccionEdificio} />
                </div>
                <p></p>

              </div>

              <div class="form-group row">
                <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                <div class="col-sm-10">
                  <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso del edificio que le corresponde al usuario"
                    onChange={handlePiso}
                    value={piso} />
                </div>
                <p></p>

              </div>


            <div class="form-group row">
              <label for="apellido" class="col-sm-2 col-form-label">Departamento</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese el departamento"
                  onChange={handleDepartamento}
                  value={departamento} />
              </div>
              <p></p>
            </div>


            <div class="form-group row">
              <label for="apellido" class="col-sm-2 col-form-label">Nombre</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese un nombre"
                  onChange={handleNombreChange}
                  value={nombre} />
              </div>
              <p></p>
            </div>
            
            <div class="form-group row">
              <label for="apellido" class="col-sm-2 col-form-label">Apellido</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="apellido" aria-describedby="apellido" placeholder="Ingrese un apellido"
                  onChange={handleApellidohange}
                  value={apellido} />
              </div>
              <p></p>

            </div>

            <div class="form-group row">
              <label for="dni" class="col-sm-2 col-form-label">DNI</label>
              <div class="col-sm-10">
                <input type="text" class="form-control" id="dni" aria-describedby="dni" placeholder="Ingrese un dni"
                  onChange={handleDni}
                  value={dni} />
              </div>
              <p></p>

            </div>

            <div class="form-group row">
              <label for="Confirmar" class="col-sm-2 col-form-label">Contraseña</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="Confirmar" placeholder="Ingrese la contraseña aquí"
                  onChange={handleContraseñaChange} value={contraseña} /
                >
              </div>
            </div>
            <p></p>

            <div class="form-group row">
              <label for="Confirmar" class="col-sm-2 col-form-label">Confirmar</label>
              <div class="col-sm-10">
                <input type="password" class="form-control" id="Confirmar" placeholder="Ingrese nuevamente la contraseña aquí"
                  onChange={handleconfirmarChange} value={confirmar} /
                >
              </div>
            </div>
            <p></p>
            <div class="form-group row">
              <div class="col-sm-2"></div>
              <div class="col-sm-10">
                <button type="submit" >Crear usuario</button>
              </div>
            </div>

            </div>

          </form>
          
        )}
      </div>
    </body>


  );
}

export default SignUp;