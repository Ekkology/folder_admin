import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import { invoke } from "@tauri-apps/api/tauri";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    setGreetMsg(await invoke("greet", { name }));
  }

  useEffect(() => {
    const button = document.getElementById('boton_select');
    if (button) {
      const handleClick = async () => {
        try {
          const direccion_folder = await invoke('select_folder');
          if (direccion_folder) {
            console.log("Se pudo seleccionar correctamente la carpeta: ", direccion_folder);
          } else {
            console.log("No se logró seleccionar ninguna carpeta");
          }
        } catch (error) {
          console.log("Error al seleccionar la carpeta: ", error);
        }
      };
      button.addEventListener('click', handleClick);

      return () => {
        button.removeEventListener('click', handleClick);
      };
    }
  }, []);


  return (
    <div className="container">
      <h1>Welcome to Tauri!</h1>
      <button id ="boton_select">Selecciona la carpeta</button>

      <div className="row">
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo vite" alt="Vite logo" />
        </a>
        <a href="https://tauri.app" target="_blank">
          <img src="/tauri.svg" className="logo tauri" alt="Tauri logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <p>Click on the Tauri, Vite, and React logos to learn more.</p>

      <form
        className="row"
        onSubmit={(e) => {
          e.preventDefault();
          greet();
        }}
      >
        <input
          id="greet-input"
          onChange={(e) => setName(e.currentTarget.value)}
          placeholder="Enter a name..."
        />
        <button type="submit">Greet</button>
      </form>

      <p>{greetMsg}</p>
    </div>
  );
}

export default App;
