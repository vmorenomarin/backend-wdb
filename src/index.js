const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("./database");

const app = express();

app.set("Port", 4000);

app.use(morgan("dev")); // Permite la creación de un log de las peticiones realizadas hacia el servidor y de las respuestas.

app.use(express.urlencoded({ extended: true })); // Necesaria para poder recibir datos desde el front end.

app.use(express.json()); // Necesaria para la conversión de datos en json y leerlos adecuadamente.
app.use(cors({ origin: "*" })); // Permite las conexiones desde cualquier cliente.
app.use("/", require("./routes/user.route"));
app.listen(app.get("Port"), () => {
  console.log(`Server running in ${app.get("Port")} port.`);
});
