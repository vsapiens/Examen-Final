import React from "react";
import "./App.css";
import Movie from "./Movie";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      peliculas: [],
      film_title: "",
      year: 0,
      rating: 0
    };
  }

  getMovies() {
    let url = "http://localhost:8080/api/moviedex";
    let settings = {
      method: "GET"
    };
    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
      })
      .then(responseJSON => {
        this.handleMovies(responseJSON);
      })
      .catch(err => {
        console.log(err);
      });
  }
  addMovie = event => {
    event.preventDefault();
  };
  componentDidMount() {
    this.getMovies();
  }
  addPelicula = responseJSON => {
    this.setState({
      peliculas: [responseJSON, ...this.state.peliculas]
    });
  };
  handleMovies = responseJSON => {
    this.setState({
      peliculas: responseJSON
    });
  };

  handleChange = event => {
    event.preventDefault();
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  addMovie = event => {
    event.preventDefault();
    let url = "http://localhost:8080/api/moviedex";

    let newMovie = {
      film_title: this.state.film_title,
      year: this.state.year,
      rating: this.state.rating
    };
    console.log(newMovie);

    /*     let settings = {
      method: "POST",
      ContentType: "application/json",
      body: JSON.stringify(newMovie)
    };

    fetch(url, settings)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        console.log(response);
      })
      .then(responseJSON => {
        this.addPelicula(responseJSON);
      })
      .catch(err => {
        console.log(err);
      }); */
  };

  render() {
    return (
      <div>
        <form>
          <h1>Add a Movie</h1>
          <p>
            {" "}
            Film Title{" "}
            <input
              name="film_title"
              onChange={this.handleChange}
              required
            ></input>
          </p>
          <p>
            {" "}
            Year{" "}
            <input name="year" onChange={this.handleChange} required></input>
          </p>
          <p>
            {" "}
            Rating{" "}
            <input name="rating" onChange={this.handleChange} required></input>
          </p>
          <button onClick={this.addMovie}>Add Movie</button>
        </form>
        <div>
          {this.state.peliculas.map((movie, index) => {
            return (
              <Movie
                film_title={movie.film_title}
                year={movie.year}
                rating={movie.rating}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default App;
