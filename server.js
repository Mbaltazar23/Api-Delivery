const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
/*
 * Importar datos
 */
const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");

const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

const upload = multer({
  storage: multer.memoryStorage(),
});
/*
 * Llamado a las rutas
 */

usersRoutes(app, upload);
categoriesRoutes(app, upload);
/*
 * Configuracion del Servidor
 */

server.listen(3000, "192.168.1.88" || "localhost", function () {
  console.log("Aplicacion de Node js " + port + " Iniciada...");
});

app.get("/", (req, res) => {
  res.send("AmistApp - Ruta raiz");
});

app.get("/test", (req, res) => {
  res.send("Ruta test");
});

// Error handler

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err.stack);
});
