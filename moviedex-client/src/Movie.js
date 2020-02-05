import React from "react";
import "./App.css";

class Movie extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1>Title: {this.props.film_title}</h1>
        <p>Year: {this.props.year}</p>
        <p>Rating: {this.props.rating}</p>
      </div>
    );
  }
}

export default Movie;
