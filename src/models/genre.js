import mongoose from 'mongoose';

const genreSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  createdData: {
    type: Date,
    default: Date.now(),
  }
});

// const Genre = module.exports = mongoose.model('Genres', genreSchema);
const Genre =  mongoose.model('Genres', genreSchema);

// get genre
const  getGenres = (callback, limit) => {
  Genre.find(callback).limit(limit);
}

const getGenreById = (id, callback) => {
  const query = {
    _id: id
  }
  Genre.findById(query, callback)
}

const postGenre = (genreObj, callback) => {
  Genre.create(genreObj, callback);
}

const updateGenre = (id, genre, options, callback) => {
  const query = { _id: id };
  const update = {
    name: genre.name,
  }
  Genre.findOneAndUpdate(query, update, options, callback);
}

const deleteGenre = (id, callback) => {
  const query = {
    _id: id,
  }
  Genre.remove(query, callback)
}

export default {
  getGenres,
  getGenreById,
  postGenre,
  updateGenre,
  deleteGenre,
}