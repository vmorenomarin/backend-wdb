const express = requires("express");
const morgan = requires("morgan");
const cors = requires("cors");

const app = express();

app.set("Port", 4000);

app.use(morgan("dev")); // Permite lka creación de un log de las peticiones realizadas hacia el servidor y de las respuestas.

app.use(express.urlencoded({ extended: true })); // necesaria para poder recibir datos desde el front end.

app.use(express.json()); // Necesaria para la conversión de datos en json y leerlos adecuadamente.
app.use(cors({ origin: "*" })); // Permite las conexiones desde cualquier cliente.

app.listen(app.get("Port"), () => {
  console.log(`Server running in ${app.get("Port")}`);
});
