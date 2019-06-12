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
            <div className="label">Title</div>
            <div className="value">{movie.Title}</div>
          </div>
          <div className="movie-description">
            <div className="label">Description</div>
            <div className="value">{movie.Description}</div>
          </div>
          <div className="movie-genre">
            <div className="label">Genre</div>
            <div className="value">{movie.Genre.Name}</div>
            <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant="link">Genre</Button>
            </Link>
          </div>
          <div className="movie-director">
            <div className="label">Director</div>
            <div className="value">{movie.Director.Name}</div>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant="link">Director</Button>
            </Link>
          </div>
          <Button variant="primary" type="submit" onClick={event => this.handleLike(event)}>Like</Button>
        </div>
        <div className="right-container">
          <img className="movie-poster" src={movie.ImagePath} />
        </div>
        <Link id="backbutton" to={'/'}><Button variant='primary'>Back</Button></Link>
       </div>
    );
  }
}
