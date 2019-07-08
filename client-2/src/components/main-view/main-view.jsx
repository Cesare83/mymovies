//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route} from "react-router-dom";
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';

import { setMovies } from '../../actions/actions';
import MoviesList from '../movies-list/movies-list';
import MovieView from '../movie-view/movie-view';
import { LoginView } from '../login-view/login-view';
import { RegistrationView } from '../registration-view/registration-view';
import DirectorView from '../director-view/director-view';
import GenreView from '../genre-view/genre-view';
import { ProfileView } from '../profile-view/profile-view';
import './main-view.scss';
import logo from './logo.png';

//-------------------------------FUNCTIONS--------------------------------------
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      user: null
    };
  }

  //tore user in localStorage after logging in and receiving back the token
  //to prevent authentication-loss after refreshing the page
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  //login
  onLoggedIn(authData) {
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

  //Logout button resets the localStorage
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

  //get a list of all database movies
  getMovies(token) {
    axios.get('https://budspencermovies.herokuapp.com/movies', {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      this.props.setMovies(response.data);
      localStorage.setItem('local-storage-movies', JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {
    const { user, movies } = this.state;

    return (
      <Router>
        <div className="main-view">
          <div className="menue">
            <header>
              <div className="header-innercontainer">
                <div className="img-container">
                  <img className="logo" src={logo} alt="Bud face"/>
                  <svg class="svg-title" width="400" height="300" viewBox="0 0 400 300">
                    <text class="svg-bud-spencer" font-size="100px" text-anchor="middle" x="200" y="130">Bud Spencer</text>
                    <text class="svg-movies" font-size="80px" text-anchor="end" x="200" y="250">movies</text>
                  </svg>
                </div>
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
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList/>;
            }}/>

            <Route exact path="/profile" render={() => <ProfileView />}/>

            <Route path="/register" render={() => <RegistrationView onRegistered={username => this.onRegistered(username)}/>}/>

            <Route exact path="/movies/:id" render={({ match }) => <MovieView movieId={match.params.id}/>}/>

            <Route exact path="/directors/:name" render={({ match }) => <DirectorView directorName={match.params.name}/>}/>

            <Route exact path="/genres/:name" render={({ match }) => <GenreView genreName={match.params.name}/>}/>

          </div>
        </div>
      </Router>
    );
  }
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(null, { setMovies } )(MainView);
