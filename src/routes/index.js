const { Router } = require('express');
const UsersController = require('../app/controllers/UsersController');
const SitesController = require('../app/controllers/SitesController');
const verifyToken = require('../app/middlewares/verifyToken');

const routes = new Router();

routes.get('/', async (req, res) => res.send({ hello: 'World' }));

routes.post('/users/register', UsersController.register);
routes.post('/users/login', UsersController.login);

routes.get('/admin/sites', verifyToken, SitesController.index);

module.exports = routes;
