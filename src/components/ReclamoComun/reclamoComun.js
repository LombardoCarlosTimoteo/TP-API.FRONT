import React, { useState } from "react";
import './formReclamoComun.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";

function ReclamoComun() {
  const [direccionEdificio, setDireccionEdificio] = useState('')
  const [lugarComun, setLugarComun] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [datosCorrectos, setdatosCorrectos] = useState(false);
  const [imagenesSeleccionadas, setimagenesSeleccionadas] = useState([]);
  const { userData, setUserData } = useContext(MyContext)

  const handleOtroReclamo = (event) => {
    setdatosCorrectos(false);
    setDireccionEdificio("")
    setLugarComun("")
    setDescripcion("")
    setimagenesSeleccionadas([])
  }

  const handleFileChange = (event) => {
    const archivos = event.target.files;
    const imagenes = [];
    for (let i = 0; i < archivos.length; i++) {
      imagenes.push(URL.createObjectURL(archivos[i]));
    }
    setimagenesSeleccionadas(imagenes);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.nombre_usuario === "") alert("Debes iniciar sesión")
    else setdatosCorrectos(true);
  }

  const handledireccionEdificio = (event) => {
    setDireccionEdificio(event.target.value)
  }

  const handleLugarComunChange = (event) => {
    setLugarComun(event.target.value)
  }
  const handleDescripcion = (event) => {
    setDescripcion(event.target.value)
  }

  return (
    <div>
      {datosCorrectos ? (
        <div className="header">

          <h1>Reclamo común enviado.Se debe mostrar el numero de reclamo para despues poder buscarlo</h1>

          <button onClick={handleOtroReclamo} className="session-button">Realizar otro reclamo común</button>
        </div>
      ) : (

        <form class="mx-auto" onSubmit={handleSubmit}>
          <h1>Formulario reclamo común</h1>

          <p></p>

          <div class="form-group row">
            <label for="direccion_edificio" class="col-sm-2 col-form-label">Dirección edificio</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="direccion_edificio" aria-describedby="direccion_edificio" placeholder="Ingrese la dirección del edificio"
                onChange={handledireccionEdificio}
                value={direccionEdificio} />
            </div>
          </div>
          
          <p></p>

          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Lugar común</label>
            <div class="col-sm-10">
              <div class="custom-select">
                <select class="form-control" id="lugarComun" name="lugarComun" onChange={handleLugarComunChange}>
                  <option value="" disabled selected>Seleccione el lugar común</option>
                  <option value="sum">Sum</option>
                  <option value="recepcion">Recepción</option>
                  <option value="pileta">Pileta</option>
                  <option value="fondo">Fondo</option>
                </select>
              </div>
            </div>
          </div>

          <p></p>

          <div class="form-group row">
            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Descripción</label>
            <div class="col-sm-10">
              <textarea class="form-control" id="descripcionReclamo" rows="3" placeholder="Ingrese la descripción del reclamo aquí.  200 caracteres como máximo"
                onChange={handleDescripcion}
                maxLength="200"
                value={descripcion}></textarea>
            </div>
          </div>
          
          <p></p> 

          <div class="form-group row">
            <label for="adjuntarImagenes" class="col-sm-2 col-form-label">Imágenes</label>
            <div class="col-sm-10">
              <div class="custom-file">
                <input type="file" class="custom-file-input" id="adjuntarImagenes" lang="es" multiple onChange={handleFileChange} />
                <p></p>
                <div>
                  {imagenesSeleccionadas.map((imagen, index) => (
                    <img key={index} src={imagen} alt={`Imagen ${index}`} width="100" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        
          <p></p>

          <div class="form-group row">
            <div class="col-sm-2"></div>
            <div class="col-sm-10">
              <button type="submit" >Realizar reclamo común</button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}

export default ReclamoComun;