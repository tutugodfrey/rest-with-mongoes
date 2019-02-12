import Books from '../models/books';

class BooksController {
  static postBook(req, res) {
    const book = req.body
    Books.postBook(book, (err, books) => {
      if (err) {
        res.json({ message: 'An error occur, please try again' })
      };
      res.json(books)
    });
  }

  static getBooks(req, res) {
    const { id } = req.params;
    Books.getBookById(id, (err, book) => {
      if (err) {
        if (err.name === "CastError") {
          res.json({ message: 'Book not found' })
        }
      }
      res.json(book);
    })
  }

  static getBook(req, res) {
    Books.getBooks((err, books) => {
      if (err) {
        res.json({ message: 'An error occur, please try again' })
      };
      res.json(books)
    });
  }

  static updateBook(req, res) {
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
  }

  static deleteBook(req, res) {
    const  { id } = req.params;
    Books.deleteBook(id, (err, result) => {
      if (err) {
        res.json({ message: 'An error occur, please try again' })
      }
      res.json(result)
    })
  }
}

export default BooksController;
