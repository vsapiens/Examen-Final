let mongoose = require("mongoose");
let uuid = require("uuid");

mongoose.Promise = global.Promise;

/* Tu código va aquí */
let moviesCollection = mongoose.Schema({
  film_ID: { type: String },
  film_title: { type: String },
  year: { type: Number },
  rating: { type: Number }
});

let Movies = mongoose.model("movies", moviesCollection);

let movieController = {
  getAll: function() {
    return Movies.find()
      .then(movies => {
        return movies;
      })
      .catch(err => {
        throw new Error(err);
      });
  },
  addMovie: function(movie) {
    return Movies.insertMany(movie)
      .then(newMovie => {
        return newMovie;
      })
      .catch(err => {
        throw new Error(err);
      });
  }
};
module.exports = { movieController };
