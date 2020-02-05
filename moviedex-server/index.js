let express = require("express");
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
let jsonParser = bodyParser.json();
let { DATABASE_URL, PORT } = require("./config");
let { movieController } = require("./model");

let app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  if (req.method === "OPTIONS") {
    return res.send(204);
  }
  next();
});

app.get("/api/moviedex", jsonParser, (req, res) => {
  movieController
    .getAll()
    .then(movies => {
      res.statusMessage = "Se han encontrado las películas";
      return res.status(200).json(movies);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error en el servidor";
      return res.status(500).send();
    });
});

app.post("/api/moviedex", jsonParser, (req, res) => {
  let { film_title, year, rating } = req.body;
  console.log(req.body);
  if (film_title == undefined || year == undefined || rating == undefined) {
    res.statusMessage = "Faltan parametros";
    return res.status(406).send();
  }
  let newMovie = {
    film_title: film_title,
    year: year,
    rating: rating
  };

  movieController
    .addMovie(newMovie)
    .then(movie => {
      res.statusMessage = "Añadido exitosamente";
      return res.status(201).json(movie[0]);
    })
    .catch(err => {
      console.log(err);
      res.statusMessage = "Error en el servidor";
      return res.status(500).send();
    });
});

let server;

function runServer(port, databaseUrl) {
  return new Promise((resolve, reject) => {
    mongoose.connect(
      databaseUrl,
      { useNewUrlParser: true, useUnifiedTopology: true },
      response => {
        if (response) {
          return reject(response);
        } else {
          server = app
            .listen(port, () => {
              console.log("App is running on port " + port);
              resolve();
            })
            .on("error", err => {
              mongoose.disconnect();
              return reject(err);
            });
        }
      }
    );
  });
}

function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing the server");
      server.close(err => {
        if (err) {
          return reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
runServer(PORT, DATABASE_URL);

module.exports = {
  app,
  runServer,
  closeServer
};
