const store = require('../../database/mysql');

const TABLA = 'actor';
const NAME_ID = 'actor_id';

exports.list = async (req, res) => {
  const actors = await store.list(TABLA);
  if (actors.length > 0) {
    res.status(200).json({
      message: 'Actors retrieved successfully',
      data: actors,
    });
  } else {
    res.status(204).json({
      message: 'The table is empty',
    });
  }
};

exports.get = async (req, res) => {
  const actor = await store.get(TABLA, NAME_ID, req.params.id);
  if (actor.length > 0) {
    res.status(200).json({
      message: 'Actor retrieved successfully',
      data: actor,
    });
  } else {
    res.status(204).json({
      message: 'The movie was not founded',
    });
  }
};

exports.upsert = async (req, res) => {
  const actor = {
    actor_name: req.body.actorName,
    actor_age: req.body.actorAge,
    actor_img: req.body.actorImg,
  };

  let message = 'Actor created sucessfully';

  if (req.body.actorId) {
    actor.actor_id = req.body.actorId;
    message = 'Actor updated sucessfully';
  }

  await store
    .upsert(TABLA, NAME_ID, actor)
    .then((data) => {
      res.status(200).json({
        message,
        data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Internal error',
      });
    });
};

exports.getActorOnMovie = async (req, res) => {
  const joinTable = `movie_${TABLA}`;
  const movieId = req.params.id;
  const query = `SELECT * FROM ${TABLA} INNER JOIN ${joinTable} ON ${joinTable}.movie_id = ${movieId} AND ${TABLA}.actor_id = ${joinTable}.actor_id`;
  await store
    .query(query)
    .then((data) => {
      res.status(200).json({
        message: 'Actors retrieved successfully',
        data,
      });
    })
    .catch((err) => {
      res.status(204).json({
        message: 'The movie was not founded',
      });
    });
};
