//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';

import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import './main-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: null,
      selectedMovie: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    axios.get('https://cesareatmymovies.herokuapp.com/movies')
    .then(response => {
      this.setState({
        movies: response.data
      });
    })
    .catch(error => {
      console.log(error);
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovie: movie
    });
  }

  mainViewClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  newUser() {
    this.setState({
      register: true
    });
  }

  onSignedIn() {
    this.setState({
      register: false
    });
  }



  render() {
    const {movies, selectedMovie, user, register} = this.state;

    if (!user) {
      if (register) return <RegistrationView onSignedIn={() => this.onSignedIn()} onLoggedIn={user => this.OnLoggedIn(user)} />;
      else return <LoginView onLoggedIn={user => this.onLoggedIn(user)} newUser={() => this.newUser()} />;
    }

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
     <div className="main-view">
      {selectedMovie
         ? <MovieView movie={selectedMovie} onClick={() => this.mainViewClick()}/>
         : movies.map(movie => (
           <MovieCard key={movie._id} movie={movie} onClick={movie => this.onMovieClick(movie)}/>
         ))
      }
     </div>
    );
  }
}
