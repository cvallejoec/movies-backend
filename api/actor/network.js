const express = require('express');
const { catchErrors } = require('../../handlers/errorHandler');
const actorController = require('./controller');

const router = express.Router();

// Routes
router.get('/', catchErrors(actorController.list));
router.get('/:id', catchErrors(actorController.get));
router.get('/movie/:id', catchErrors(actorController.getActorOnMovie));
router.post('/', catchErrors(actorController.upsert));

module.exports = router;
