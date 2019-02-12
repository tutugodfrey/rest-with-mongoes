import Genres from '../models/genre';

class GenreController {
  static postGenre(req, res) {
    Genres.postGenre(req.body, (err, genres) => {
      if (err) {
        res.json({ message: 'An error occur, please try again' })
      }
      res.json(genres)
    });
  }

  static getGenres(req, res) {
    Genres.getGenres((err, genres) => {
      if (err) {
        res.json({ message: 'An error occur, please try again' })
      };
      res.json(genres)
    });
  }

  static getGenre(req, res) {
    const { id } = req.params;
    Genres.getGenreById(id, (err, result) => {
      if (err) {
        if (err.name === "CastError") {
          res.json({ message: 'Genre not found' })
        }
      }
      if (result === null) {
        return res.json({ message: 'Genre not found' });
      }
      return res.json(result);
    });
  }

  static putGenre(req, res) {
    const { id } = req.params;
    const genre = req.body;
    Genres.updateGenre(id, genre, {}, (err, genre) => {
      if (err) {
        if (err.name === 'CastError') {
          res.json({ message: 'Genre does not exist' })
        }
      }
      res.json(genre);
    });
  }

  static deleteGenre(req, res) {
    const { id  } = req.params;
    Genres.deleteGenre(id, (err, genre) => {
      if (err) {
        if (err.name === 'CastError') {
          res.json({ message: 'Genre does not exist' })
        }
      }
      res.json(genre)
    });
  }
}

export default GenreController;
