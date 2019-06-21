//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './movie-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export class MovieView extends React.Component {

  constructor() {
    super();

    this.state = {};
  }

  handleLike(event) {
    event.preventDefault();
    let username = localStorage.getItem('user');
    let movieId = this.props.movie._id;
    axios.put(`https://cesareatmymovies.herokuapp.com/users/${username}/movies/${movieId}`, {},{
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Movie added to the favourites!');
    })
    .catch(function (error) {
      console.log(error);
      alert('Movie has not been added to the favourites!');
    });
  }



  render() {
    const { movie } = this.props;

    if (!movie) return null;

    return (
       <div className="movie-view">
          <div className="left-container">
            <div className="movie-title">
              <h2 className="label">Title</h2>
              <div className="value">{movie.Title}</div>
              </div>
            <div className="movie-description">
              <h2 className="label">Description</h2>
              <div className="description-text">{movie.Description}</div>
              </div>
            <div className="movie-genre">
              <h2 className="label">Genre</h2>
              <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </div>
            <div className="movie-director">
              <h2 className="label">Director</h2>
              <Link to={`/directors/${movie.Director.Name}`}>{movie.Director.Name}</Link>
            </div>
            <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
          </div>
          <div className="right-container">
            <img className="movie-poster" src={movie.ImagePath} />
            <Button className="standard-button" variant="link" onClick={event => this.handleLike(event)}>Like</Button>
          </div>
      </div>
    );
  }
}
