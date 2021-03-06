//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import { connect } from 'react-redux';

import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { MovieCard } from '../movie-card/movie-card';
import './movies-list.scss';

//-------------------------------FUNCTION---------------------------------------

//copy the movies array whith concat() and sort it
const mapStateToProps = state => {
  const { movies, visibilityFilter, sortColumn } = state;

  let moviesToShow = movies.concat().sort((a, b) => {
    if (a[sortColumn] < b[sortColumn]) return -1;
    if (a[sortColumn] > b[sortColumn]) return 1;
    return 0;
  });

  if (visibilityFilter !== '') {
    moviesToShow = moviesToShow.filter(movie => movie.Title.toLowerCase().includes(visibilityFilter.toLowerCase()));
  }

  return { movies: moviesToShow };
};

function MoviesList(props) {
  const { movies } = props;

  if (!movies) return <div className="main-view"/>;

  return <div className="movies-list">
    <VisibilityFilterInput/>
    {movies.map(movie => <MovieCard key={movie._id} movie={movie}/>)}
  </div>;
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(mapStateToProps, null)(MoviesList);
