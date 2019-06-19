//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
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

  //movie-view for new registered user
  onRegistered(username) {
    this.setState({
      user: username
    });
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('movies');

    this.setState({
      user: null
    });
    //display login after log out
    window.open('/','_self');
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

  render() {
    const {movies, user} = this.state;


    // Before the movies have been loaded
    if (!movies) return <div className="main-view"/>;

    return (
      <Router>
        <div className="main-view">
          <div className="menue">
            <header>
              <div className="header-innercontainer">
                <h1>Bud Spencer Movies</h1>
                <div className="menue-buttons-container">
                  <Link id="profile-button" to={'/profile'}>
                    <Button className="menue-buttons" variant="link">MyProfile</Button>
                  </Link>
                  <Button className="menue-buttons" variant="link" onClick={() => this.logOut()}>Log Out</Button>
                </div>
              </div>
            </header>
          </div>

          <div className="page">

            <Route exact path="/" render={() => {
              if (!user) {
                return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              } else {
                return movies.map(m => <MovieCard key={m._id} movie={m}/>)
                }
              }
            }/>
            <Route exact path="/profile" render={() => <ProfileView />}/>

            <Route path="/register" render={() => <RegistrationView onRegistered={username => this.onRegistered(username)}/>}/>

            <Route path="/movies/:movieId" render={({match}) => <MovieView movie={movies.find(m => m._id === match.params.movieId)}/>}/>

            <Route path="/directors/:name" render={({ match }) => {
            if (!movies || !movies.length) return <div className="main-view"/>;
            return <DirectorView director={movies.find(movie => movie.Director.Name === match.params.name).Director}/>}
            }/>

            <Route exact path="/genres/:name" render={ ({match}) => {
              if (!movies || !movies.length) return <div className="main-view"/>;
              return <GenreView genre={movies.find(movie => movie.Genre.Name === match.params.name).Genre} />}
            }/>
          </div>
        </div>
      </Router>

    );
  }
}
