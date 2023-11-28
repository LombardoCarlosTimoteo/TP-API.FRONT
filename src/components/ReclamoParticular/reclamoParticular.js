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
    const [imagenesBlob, setimagenesBlob] = useState([]);
    const [imagenesSeleccionadasBlob, setimagenesSeleccionadasBlob] = useState([]);

    useEffect(() => {
        setDireccionEdificio(userData.idEdificio);
        setDepartamento(userData.departamento);
        setDireccionEdificio(userData.direccionEdificio);
        setPiso(userData.piso);
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
        const crudos = [];

        for (let i = 0; i < archivos.length; i++) {
            var imagen = (URL.createObjectURL(archivos[i]));
            var crudo= archivos[i]
            imagenes.push(imagen);
            crudos.push(crudo)
            console.log("va")
            console.log(archivos[i])
        }
        setimagenesSeleccionadas(crudos);
        setimagenesSeleccionadasBlob(imagenes)
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (userData.nombre_usuario == ""  || userData.habilitadoReclamos == false)
          alert("No puedes hacer reclamos")
        else if (userData.tipoUsuario === "INQUILINO"){
          try {
            var URL = "http://localhost:8080/api/reclamos";
            var data = {
              
              "direccionEdificio": userData.direccionEdificio, 
              "unidadDepartamento": userData.departamento,
              "pisoDepartamento": userData.piso,
              "descripcion": descripcion,
              //"imagenes": imagenesSeleccionadas
              "tipoReclamo": "PARTICULAR",
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

            var URL = `http://localhost:8080/api/imagen/${responseData.id}`
            for(let i = 0; i < imagenesSeleccionadas.length ; i++)
            
            {
              var formData = new FormData();
              formData.append("archivo", imagenesSeleccionadas[i]);
            
              fetch(URL, {
                method: 'POST',
                headers: {
                  Authorization: `Bearer ${userData.token}`
                },
                body: formData,
              });
            }
  
            
          } catch (error) {
            console.error("Error:", error);
          }
        }

        else if(userData.tipoUsuario === "DUENIO"){
            //chequear que su depto no tenga inquilino
            var piso_dueño = userData.piso
            var departamento_dueño = userData.departamento
            var direccionEdificio_dueño = userData.direccionEdificio
            
            
            var URL = `http://localhost:8080/api/departamentos/${direccionEdificio_dueño}/${piso_dueño}/${departamento_dueño}`
            var token = `Bearer ${userData.token}`
            console.log(token)
            fetch(URL, {
                headers: new Headers({
                    'Authorization': token,
                }),
                method: "GET"
            }).then(response => response.json())
            .then(async response => {
                console.log("inquilino" , response.inquilinoId)
                if (response.inquilinoId == 0){
                    try {
                        var URL = "http://localhost:8080/api/reclamos";
                        var data = {
                          
                          "direccionEdificio": userData.direccionEdificio, 
                          "unidadDepartamento": userData.departamento,
                          "pisoDepartamento": userData.piso,
                          "descripcion": descripcion,
                          //"imagenes": imagenesSeleccionadas
                          "tipoReclamo": "PARTICULAR",
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
                        })
                        .then(response => response.json())
                        .then(response => { responseData = response })
                  
                        
                  
                        setnroReclamo(responseData.id);
                        setdatosCorrectos(true);
            
                        var URL = `http://localhost:8080/api/imagen/${responseData.id}`
                        for(let i = 0; i < imagenesSeleccionadas.length ; i++)
                        
                        {
                          var formData = new FormData();
                          formData.append("archivo", imagenesSeleccionadas[i]);
                        
                          fetch(URL, {
                            method: 'POST',
                            headers: {
                              Authorization: `Bearer ${userData.token}`
                            },
                            body: formData,
                          });
                        }       
                      } catch (error) {
                        console.error("Error:", error);
                      }
                }
                else{
                    alert("No puedes realizar reclamos porque tienes inquilino")
                }
            })
        } 
        else{
            alert("No puedes hacer reclamos")
        }
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

    const handleDescripcion = (event) => {
        setDescripcion(event.target.value)
    }

    return (
        <div>
            {datosCorrectos ? (
                <div className="header">

                    <h1>Reclamo particular enviado. El numero de reclamo es #{nroReclamo}</h1>
                    <h1>Guarde el número de reclamo para consultarlo en un futuro.</h1>

                    <button onClick={handleOtroReclamo} className="session-button">Realizar otro reclamo particular</button>
                </div>) :
                (
                    <form class="mx-auto" onSubmit={handleSubmit}>
                        <h1>Formulario reclamo particular</h1>


                        <p></p>

                        <div class="form-group row">
                            <label for="direccionEdificio" class="col-sm-2 col-form-label">Dirección edificio</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="direccionEdificio" aria-describedby="direccionEdificio" readOnly
                                    value={direccionEdificio} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Piso" class="col-sm-2 col-form-label">Piso</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Piso" aria-describedby="Piso"  readOnly value={piso} />
                            </div>
                        </div>
                        
                        <p></p>

                        <div class="form-group row">
                            <label for="Departamento" class="col-sm-2 col-form-label">Departamento</label>
                            <div class="col-sm-10">
                                <input type="text" class="form-control" id="Departamento" aria-describedby="Departamento"  readOnly
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
                                        {imagenesSeleccionadasBlob.map((imagen, index) => (
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