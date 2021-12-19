const { Router } = require('express');
const UsersController = require('../app/controllers/UsersController');

const routes = new Router();

routes.get('/', async (req, res) => res.send({ hello: 'World' }));

routes.post('/users/register', UsersController.register);
routes.post('/users/login', UsersController.login);

module.exports = routes;
