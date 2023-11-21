import React, { useState } from "react";
import './formReclamoParticular.css';
import { useContext } from "react";
import MyContext from "../ReactContext/myContext";
import { useEffect } from "react";
function ReclamoParticular() {
    const [descripcion, setDescripcion] = useState("")
    const [piso, setPiso] = useState("")
    const [departamento, setDepartamento] = useState("")
    const [direccionEdificio, setDireccionEdificio] = useState('')
    const [datosCorrectos, setdatosCorrectos] = useState(false);
    const [imagenesSeleccionadas, setimagenesSeleccionadas] = useState([]);
    const { userData, setUserData } = useContext(MyContext)
    const [nroReclamo,setnroReclamo] = useState("")
    
    useEffect(() => {
        setDireccionEdificio(userData.idEdificio)
        setDepartamento(userData.idDepto)
    }, []);    
    
    const handleOtroReclamo = (event) => {
        setdatosCorrectos(false);
        setDescripcion("")
        setPiso("")
        setDepartamento("")
        setDireccionEdificio("")
        setimagenesSeleccionadas([])
    }

    const handleFileChange = (event) => {
        const archivos = event.target.files;
        const imagenes = [];
        for (let i = 0; i < archivos.length; i++) {
            imagenes.push(URL.createObjectURL(archivos[i]));
            console.log("va")
            console.log(archivos[i])
        }
        setimagenesSeleccionadas(imagenes);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.nombre_usuario === "") {
          alert("Debes iniciar sesión");
        } else {
          try {
            var URL = "http://localhost:8080/api/reclamos";
            var data = {
              "idEdificio": userData.idEdificio,
              //"departamento": userData.idDepto,
              "descripcion": descripcion,
              "imagenes": imagenesSeleccionadas
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
  
            
          } catch (error) {
            console.error("Error:", error);
          }
        }
      };

    const handledireccionEdificio = (event) => {
        setDireccionEdificio(event.target.value)
    }

    const handlePiso = (event) => {
        setPiso(event.target.value)
    }

    const handleDepartamento = (event) => {
        setDepartamento(event.target.value)
    }

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    return (
        <div>
            {datosCorrectos ? (
                <div className="header">

                    <h1>Reclamo particular enviado. El numero de reclamo es {nroReclamo}</h1>

                    <button onClick={handleOtroReclamo} className="session-button">Realizar otro reclamo particular</button>
                </div>) :
                (
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Formulario reclamo particular</h1>

                        <p></p>

                        <div class="form-group row">
                            <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccionEdificio" placeholder="Ingrese la dirección del edificio" readOnly
                                    onChange={handledireccionEdificio}
                                    value={direccionEdificio} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso" placeholder="Ingrese el piso del edificio"
                                    onChange={handlePiso}
                                    value={piso} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento" placeholder="Ingrese el departamento" readOnly
                                    onChange={handleDepartamento}
                                    value={departamento} />
                            </div>
                        </div>

                        <p></p>

                        <div class="form-group row">
                            <label for="descripcionReclamo" class="col-sm-2 col-form-label">Descripción</label>
                            <div class="col-sm-10">
                                <textarea class="form-control" id="descripcionReclamo" rows="3" placeholder="Ingrese la descripción del reclamo aquí"
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
                                <button type="submit" >Realizar reclamo particular</button>
                            </div>
                        </div>
                    </form>
                )}
        </div>
    );
}

export default ReclamoParticular;