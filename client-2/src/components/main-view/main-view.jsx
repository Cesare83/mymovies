//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
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
      selectedMovieId: null,
      user: null,
      register: false
    };
  }

  componentDidMount() {
    window.addEventListener('hashchange', this.handleNewHash, false);

    this.handleNewHash();

    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  handleNewHash = () => {
    const movieId = window.location.hash.replace(/^#\/?|\/$/g, '').split('/');

    this.setState({
      selectedMovieId: movieId[0]
    });
  }

  onMovieClick(movie) {
    this.setState({
      selectedMovieId: movie.id
    });
    window.location.hash = '#' + movie._id;
  }

  mainViewClick() {
    this.setState({
      selectedMovie: null
    });
  }

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  getMovies(token) {
    axios.get('https://cesareatmymovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        movies: response.data
      });
    })
    .catch(function (error) {
      console.log(error);
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
    const {movies, selectedMovieId, user, register} = this.state;

    if (!user) {
      if (register) return <RegistrationView onSignedIn={() => this.onSignedIn()} onLoggedIn={user => this.onLoggedIn(user)} />;
      else return <LoginView onLoggedIn={user => this.onLoggedIn(user)} newUser={() => this.newUser()} />;
    }

    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    const selectedMovie = selectedMovieId ? movies.find(m => m._id === selectedMovieId) : null;

    return (
      /*<Router>
          <div className="main-view">
            <Route exact path="/" render={// welcome //}/>
            <Route exact path="/movies/:movieId" render={// movie view //}/>
            <Route exact path="/genres/:name" render={// genre view//}/>
            <Route exact path="/directors/:name" render={// director view //}/>
          </div>
        </Router>*/

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
