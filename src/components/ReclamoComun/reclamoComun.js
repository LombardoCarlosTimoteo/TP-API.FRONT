import React, { useState } from "react";
import './formReclamoComun.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from "react";

function ReclamoComun() {
  const [direccionEdificio, setDireccionEdificio] = useState('')
  const [lugarComun, setLugarComun] = useState("")
  const [descripcion, setDescripcion] = useState("")
  const [datosCorrectos, setdatosCorrectos] = useState(false);
  const [imagenesSeleccionadas, setimagenesSeleccionadas] = useState([]);
  const { userData, setUserData } = useContext(MyContext)
  const [nroReclamo,setnroReclamo] = useState("")

  useEffect(() => {
    setDireccionEdificio(userData.direccionEdificio);
}, []);    

  const handleOtroReclamo = (event) => {
    setdatosCorrectos(false);
    setLugarComun("")
    setDescripcion("")
    setimagenesSeleccionadas([])
  }
  //const cleanBlobURL = (blobURL) => blobURL.replace(/^blob:/, '');
  const handleFileChange = (event) => {
    const archivos = event.target.files;
    const imagenes = [];
    for (let i = 0; i < archivos.length; i++) {
      var imagen = (URL.createObjectURL(archivos[i]));
      console.log("archivos[i]",archivos[i])
/*       //blobcleanBlobURL(imagen)
      imagen = imagen.toString()
      imagenes.push(imagen.substring(5)); */
      imagenes.push(URL.createObjectURL(archivos[i]));
    }
    setimagenesSeleccionadas(imagenes);
    console.log("imagenesSeleccionadas",imagenesSeleccionadas)
  };

/*   const handleSubmit = (event) => {
    event.preventDefault();
    if (userData.nombre_usuario === "") alert("Debes iniciar sesión")
    else{
      var URL = "http://localhost:8080/api/reclamos"
      var data = {
        "idEdificio": userData.idEdificio,
        "lugar_comun": lugarComun,
        "descripcion": descripcion,
        "imagenes": imagenesSeleccionadas
      }
      fetch(URL, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userData.token}`,
      },
      body: JSON.stringify({
        "lugarComun": lugarComun,
        "descripcion": descripcion,
        "imagenes": imagenesSeleccionadas
      })
    })
    .then(response => {
      response.json()
      console.log("descripcion", descripcion)
    })
    .then(data => {
      nroReclamo = data.id
    })
   } */
    const handleSubmit = async (event) => {
      event.preventDefault();
      
      if(lugarComun==="" || descripcion === "") 
        	alert("No has completado todos los campos"); 
      else {
        try {
          var URL = "http://localhost:8080/api/reclamos";
          var data = {
            //"direccionEdificio": direccionEdificio.toLowerCase(),
            "direccionEdificio":userData.direccionEdificio,
            "lugarComun": lugarComun,
            "descripcion": descripcion,
            //"imagenes": imagenesSeleccionadas,
            "tipoReclamo": "COMUN",
            "estadoReclamo": "NUEVO",
            "usuarioId": userData.usuarioID
        
          };
    
          var response = await fetch(URL, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${userData.token}`,
            },
            body: JSON.stringify(data),
          });
    
          var responseData = await response.json();
          
          console.log("descripcion", descripcion);
    
          setnroReclamo(responseData.id);
          setdatosCorrectos(true);
          console.log("responseData",responseData)
          
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };
      
  
    

    


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

          <h1>Reclamo común enviado. El numero de reclamo es #{nroReclamo}</h1>
          <h1>Guarde el número de reclamo para consultarlo en un futuro.</h1>

          <button onClick={handleOtroReclamo} className="session-button">Realizar otro reclamo común</button>
        </div>
      ) : (

        <form class="mx-auto" onSubmit={handleSubmit}>
          <h1>Formulario reclamo común</h1>

          <p></p>

          <div class="form-group row">
            <label for="userData.idEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" id="direccion_edificio" aria-describedby="direccion_edificio" readOnly
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
                  <option value="SUM">Sum</option>
                  <option value="RECEPCION">Recepción</option>
                  <option value="PILETA">Pileta</option>
                  <option value="FONDO">Fondo</option>
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