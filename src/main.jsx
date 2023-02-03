import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);

// desde el boton save llamar handleNewClient
//llamar el fetch con el metodo post para crear el nuevo cliente
//crearlo en json guardarlo en variable
//usar JSON.stringify(data)
// activar handleIsModal
// setRefresh

// usar le onchange para cada uno de los inputs

//Tener un toggle para cuando es add new client
// Y para cuando es edit
// El boton va a cabmiar el render
//Van a aver 2 botones distindos dependiendo de cual sea edit or add new client
//el boton va a ser igual pero va a tener el update o el put o el post
//creo que va a ser post porque tengo post en el server para los dos create y update usan post
