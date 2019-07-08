//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

import './movie-view.scss';

//-------------------------------FUNCTIONS--------------------------------------
function MovieView(props) {
  const { movies, movieId } = props;

  if (!movies || !movies.length) return null;

  const movie = movies.find(m => m._id == movieId);

  function handleLike(event) {
    event.preventDefault();
    let username = localStorage.getItem('user');
    axios.put(`https://budspencermovies.herokuapp.com/users/${username}/movies/${movie._id}`, {},{
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
  };

  return (
    <div className="movie-view">
      <div className="movie-title-desktop">
        <h2 className="subview-title">{movie.Title}</h2>
      </div>
      <div className="movie-view-container">
        <div className="left-container">
          <div className="image-container">
            <img className="movie-poster" src={movie.ImagePath} alt="movie poster" />
          </div>
          <div className="movie-title-mobile">
            <h2 className="label" id="movie-title">{movie.Title}</h2>
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
          <div className="buttons-container">
            <Button className="standard-button buttons-next" variant="link" onClick={event => handleLike(event)}>Like</Button>
            <Link to={'/'}><Button className="standard-button buttons-next" variant="link">Back</Button></Link>
          </div>
        </div>
        <div className="right-container">
          <img className="movie-poster" src={movie.ImagePath} alt="movie poster" />
        </div>
      </div>
    </div>
  )
}


//----------------------------------STORE CONNECTION----------------------------
export default connect(({movies}) => ({movies}))(MovieView);
