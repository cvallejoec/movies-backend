const store = require('../../database/mysql');

const TABLA = 'movie';
const NAME_ID = 'movie_id';

exports.list = async (req, res) => {
  const movies = await store.list(TABLA);
  if (movies.length > 0) {
    res.status(200).json({
      message: 'Movies retrieved successfully',
      data: movies,
    });
  } else {
    res.status(204).json({
      message: 'The table is empty',
    });
  }
};

exports.get = async (req, res) => {
  const movie = await store.get(TABLA, NAME_ID, req.params.id);
  if (movie.length > 0) {
    res.status(200).json({
      message: 'Movie retrieved successfully',
      data: movie,
    });
  } else {
    res.status(204).json({
      message: 'The movie was not founded',
    });
  }
};

exports.upsert = async (req, res) => {
  const movie = {
    movie_name: req.body.movieName,
    movie_duration: req.body.movieDuration,
    movie_genre: req.body.movieGenre,
    movie_synopsis: req.body.movieSynopsis,
  };

  let message = 'Movie created sucessfully';

  if (req.body.movieId) {
    movie.movie_id = req.body.movieId;
    message = 'Movie updated sucessfully';
  }

  await store
    .upsert(TABLA, NAME_ID, movie)
    .then((data) => {
      res.status(200).json({
        message,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: 'Internal error',
      });
    });
};
