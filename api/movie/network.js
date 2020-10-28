const express = require('express');
const { catchErrors } = require('../../handlers/errorHandler');
const movieController = require('./controller');

const router = express.Router();

// Routes
router.get('/', catchErrors(movieController.list));
router.get('/:id', catchErrors(movieController.get));
router.post('/', catchErrors(movieController.upsert));
router.delete('/:id', catchErrors(movieController.remove));

module.exports = router;
