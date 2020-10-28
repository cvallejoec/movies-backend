const express = require('express');
const config = require('../config');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require('cors')());

// Router
app.get('/', (req, res) => {
  res.status(200).json({
    hello: 'world!',
  });
});

const errorHandler = require('../handlers/errorHandler');
app.use(errorHandler.notFound);
config.server.mode === 'development'
  ? app.use(errorHandler.developmentErrors)
  : app.use(errorHandler.productionErrors);

module.exports = app;