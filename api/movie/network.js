const express = require('express');
const { catchErrors } = require('../../handlers/errorHandler');
const movieController = require('./controller');

const router = express.Router();

// Routes
router.get('/', catchErrors(movieController.list));
router.get('/:id', catchErrors(movieController.get));
router.post('/', catchErrors(movieController.upsert));
router.delete('/:id', catchErrors(movieController.remove));
router.post('/link', catchErrors(movieController.link));
router.post('/unlink', catchErrors(movieController.unlink));

module.exports = router;
