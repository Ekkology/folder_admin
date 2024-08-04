import react from "react";
import Dash_board from "../components/dash_board";
import Nav_bar from "../components/nav_bar";
import Workstatiton from "../components/workstation";
import "/src/style/componentes.css";

function Start() {
  return (
    <div className="form_1" >
      <div className="Dashboard">
        <Dash_board />
        </div>
        {/* Esto es un comentario en el render 
      <div className="navbar"> 
          <Nav_bar />
        </div>
        */}
        <div className="workstation">
          <Workstatiton />
        </div>
      </div>
  );
}
export default Start;
