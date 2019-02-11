import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv-safe';
import Genres  from './models/genre';
import Books from './models/books';

dotenv.config();
const connectionString = process.env.DATABASE_URL;
mongoose.connect(connectionString);

const db = mongoose.connection;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api', (req, res) => {
  return res.status(200).send({
    message: 'welcome to our book store'
  });
});

app.get('/api/books', (req, res) => {
  Books.getBooks((err, books) => {
    if (err) {
      res.json({ message: 'An error occur, please try again' })
    };
    res.json(books)
  });
});

app.get('/api/books/:id', (req, res) => {
  const { id } = req.params;
  Books.getBookById(id, (err, book) => {
    if (err) {
      if (err.name === "CastError") {
        res.json({ message: 'Book not found' })
      }
    }
    res.json(book)
  })
});

app.post('/api/books', (req, res) => {
  const book = req.body
  Books.postBook(book, (err, books) => {
    if (err) {
      res.json({ message: 'An error occur, please try again' })
    };
    res.json(books)
  });
});

app.put('/api/books/:id', (req, res) => {
  const { id } = req.params;
  const book = req.body;
  Books.updateBook(id, book, {}, (err, book) => {
    if (err) {
      if (err.name === 'CastError') {
        res.json({ message : 'Book does not exist' })
      }
    }
  
    res.json(book)
  })
});

app.delete('/api/books/:id', (req, res) => {
  const  { id } = req.params;
  Books.deleteBook(id, (err, result) => {
    if (err) {
      res.json({ message: 'An error occur, please try again' })
    }
    res.json(result)
  })
})

app.get('/api/genres', (req, res) => {
  Genres.getGenres((err, genres) => {
    if (err) {
      res.json({ message: 'An error occur, please try again' })
    };
    res.json(genres)
  });
});

app.get('/api/genres/:id', (req, res) => {
  const { id } = req.params;
  Genres.getGenreById(id, (err, result) => {
    if (err) {
      if (err.name === "CastError") {
        res.json({ message: 'Genre not found' })
      }
    }
    res.json(result);
  })
})

app.post('/api/genres', (req, res) => {
  Genres.postGenre(req.body, (err, genres) => {
    if (err) {
      res.json({ message: 'An error occur, please try again' })
    }
    res.json(genres)
  });
});

app.put('/api/genres/:id', (req, res) => {
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
});

app.delete('/api/genres/:id', (req, res) => {
  const { id  } = req.params;
  Genres.deleteGenre(id, (err, genre) => {
    if (err) {
      if (err.name === 'CastError') {
        res.json({ message: 'Genre does not exist' })
      }
    }
    res.json(genre)
  })
})

app.listen(3000, () => {
  console.log('server started on port 3000')
})
