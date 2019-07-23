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
      <div className="view-border"></div>
      <div className="genre-name">
        <h2 className="subview-title">{genre.Name}</h2>
      </div>
      <div className="genre-description">
        <div id="genre-description-text" className="description-text">{genre.Description}</div>
      </div>
      <div className="view-border">
        <div className="button-container">
          <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
        </div>
      </div>
    </div>
    );
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(({movies}) => ({movies}))(GenreView);
