import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "src/style/App.css";

function App() {
  const [greetMsg, setGreetMsg, save_ruta] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    const button = document.getElementById("boton_select");
    if (button) {
      const handleClick = async () => {
        try {
          const direccion_folder = await invoke("select_folder");
          if (direccion_folder) {
            console.log(
              "Se pudo seleccionar correctamente la carpeta: ",
              direccion_folder
            );
            document.getElementById("rutaF").value = direccion_folder;
          } else {
            console.log("No se logró seleccionar ninguna carpeta");
          }
        } catch (error) {
          console.log("Error al seleccionar la carpeta: ", error);
        }
      };
      button.addEventListener("click", handleClick);

      return () => {
        button.removeEventListener("click", handleClick);
      };
    }
  }, []);

  const boton_safe = document.getElementById("save1");
  if (boton_safe) {
    try{
      boton_safe.addEventListener("click", () => { 
        invoke("escritura_ruta", {
          nombreRuta: document.getElementById("rutaF").value,
        });
      });
    }
    catch(error) {
      console.log("Error al enviar datos a Rust")
    }
  } else {
    console.log("No se que ha pasado, presiona el boton")
  }

  return (
    <div className="container">
    <h1 className="titulo" > Bienvenido a UDIR </h1>   
      <div className="primer_form ">
        <form className="form1" id="form1">
          <input className="rutaF" id="rutaF" type="text" />
        </form>
        <button className="boton_folder" id="boton_select">
          Selecciona la carpeta
        </button>
      </div>
      <button id="save1" className="saveB">
        Save
      </button>
    <img src="src\images\fondo_udir.png" className = "image" />
    </div>
  );
}

export default App;
