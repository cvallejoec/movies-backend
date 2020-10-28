const express = require('express');
const config = require('../config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// Router
app.use('/api/movie', require('./movie/network'));
app.use('/api/actor', require('./actor/network'));

const errorHandler = require('../handlers/errorHandler');
app.use(errorHandler.notFound);
config.server.mode === 'development'
  ? app.use(errorHandler.developmentErrors)
  : app.use(errorHandler.productionErrors);

module.exports = app;
