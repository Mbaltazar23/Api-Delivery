const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const logger = require("morgan");
const cors = require("cors");
const passport = require("passport");
const multer = require("multer");
const io = require("socket.io")(server)
const mercadopago = require("mercadopago")
mercadopago.configure({sandbox: true, access_token: 'TEST-4345948724789304-061301-03ec356bb8a7809a0f52fbadb30cec53-138199846'})
/*
IMPORTAR SOCKETS
*/

const orderSocket = require("./sockets/ordersSocket")
/*
 * Importar datos
 */
const usersRoutes = require("./routes/userRoutes");
const categoriesRoutes = require("./routes/categoryRoutes");
const productsRoutes = require("./routes/productRoutes");
const addressRoutes = require("./routes/addressRoutes");
const orderRoutes = require("./routes/orderRoutes");
const mercadoPagoRoutes = require("./routes/mercadoPagoRoutes")
const stripeRoutes = require("./routes/stripeRoutes")


const port = process.env.PORT || 3000;

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

require("./config/passport")(passport);

app.disable("x-powered-by");

app.set("port", port);

/*
Llamado a los Sockets
*/
orderSocket(io)

const upload = multer({storage: multer.memoryStorage()});
/*
 * Llamado a las rutas
 */

usersRoutes(app, upload);
categoriesRoutes(app, upload);
productsRoutes(app, upload);
addressRoutes(app);
orderRoutes(app);
mercadoPagoRoutes(app)
stripeRoutes(app)
/*
 * Configuracion del Servidor
 
 URL Inicial : 192.168.1.88
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
