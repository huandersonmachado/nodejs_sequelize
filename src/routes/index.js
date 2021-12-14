const { Router } = require('express');

const routes = new Router();

routes.get('/', async (req, res) => res.send({ hello: 'World' }));

module.exports = routes;
