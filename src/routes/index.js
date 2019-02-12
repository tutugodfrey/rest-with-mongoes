import express from 'express';
import BooksController from '../controllers/BooksController';
import GenresController from '../controllers/GenresController'; 

const router = express.Router();

router.post('/books', BooksController.postBook);
router.get('/books/:id', BooksController.getBooks);
router.get('/books', BooksController.getBook);
router.put('/books/:id', BooksController.updateBook);
router.delete('/book/:id', BooksController.deleteBook);

router.post('/genres', GenresController.postGenre);
router.get('/genres', GenresController.getGenres);
router.get('/genres/:id', GenresController.getGenre);
router.put('/genres/:id', GenresController.putGenre);
router.delete('/genres/:id', GenresController.deleteGenre);

export default router;
