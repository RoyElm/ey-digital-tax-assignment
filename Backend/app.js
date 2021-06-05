const cors = require("cors");
const exchangeRates = require("./exchange-rates/exchange-rates");
const express = require("express");
const path = require("path");

//starting the ExpressJS server function;
const server = express();

//Enabling cors to access from all ip address, allowing json as response and allowing file uploading.
server.use(cors())
server.use(express.json());

server.use(express.static(path.join(__dirname, "./frontend")));

//ExpressJS Routes to controllers.
server.use("/api/exchangeRates", exchangeRates);

server.use("*", (request, response) => {
    response.sendFile(path.join(__dirname, "./frontend/index.html"))
});

//start listen to the port.
const port = process.env.PORT || 3001;
server.listen(port, () => console.log("Listening...."));
