import mongoose from 'mongoose';

const bookSchema = mongoose.Schema({
  author: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
});

const Books = mongoose.model('Books', bookSchema);

const getBooks = (callback, limit) => {
  Books.find(callback).limit(limit);
};

const getBookById = (id, callback) => {
  const query = {
    _id: id,
  }
  Books.findById(query, callback);
}

const postBook = (bookObj, callback) => {
  Books.create(bookObj, callback);
};

const updateBook = (id, book, options, callback) => {
  const query = { _id: id };
  const update = {
    author: book.author,
    title: book.title,
  }
  Books.findOneAndUpdate(query, update, options, callback);
}

const deleteBook = (id, callback) => {
  const query = {
    _id: id,
  }
  Books.remove(query, callback);
}
export default {
  getBooks,
  getBookById,
  postBook,
  updateBook,
  deleteBook,
}