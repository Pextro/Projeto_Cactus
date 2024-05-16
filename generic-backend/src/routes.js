const { Router } = require("express");
const { getClientes } = require('./controllers/clienteController');

const findByIdClientesController = require("./controllers/client/findManyClientes");

const routes = Router();

//rota para buscar todos os clientes
routes.get("/findManyCliente", findByIdClientesController.handle);
routes.get('/clientes/{', getClientes);

module.exports = routes;
