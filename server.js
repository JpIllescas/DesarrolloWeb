// Importamos el modulo express 
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();
app.get("/", (req, res) => {
  res.json({ message: "UMG Web Application" });
});

require("./app/routes/cliente.routes.js")(app); 
require("./app/routes/producto.routes.js")(app);
require("./app/routes/pedido.routes.js")(app);  
require("./app/routes/detalle_pedido.routes.js")(app);
require("./app/routes/empleado.routes.js")(app);
require("./app/routes/proveedor.routes.js")(app);
require("./app/routes/departamento.routes.js")(app);
const PORT = process.env.PORT || 8081;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});