//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import { connect } from 'react-redux';

import Button from 'react-bootstrap/Button';
import { Link } from "react-router-dom";
import './genre-view.scss';

//-------------------------------FUNCTIONS--------------------------------------
function GenreView(props) {

  const { movies, genreName } = props;
  if (!movies || !movies.length) return null;
  const genre = movies.find(movie => movie.Genre.Name == genreName).Genre;

  return (
    <div className="genre-view">
      <div className="genre-name">
        <h2 className="label">Name</h2>
        <div className="value">{genre.Name}</div>
      </div>
      <div className="genre-description">
        <h2 className="label">Description</h2>
        <div id="genre-description-text" className="description-text">{genre.Description}</div>
      </div>
      <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
    </div>
    );
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(({movies}) => ({movies}))(GenreView);
