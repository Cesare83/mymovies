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
import { MovieCard } from '../movie-card/movie-card';
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
              if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
              return <MoviesList/>;
            }}/>

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

//----------------------------------STORE CONNECTION----------------------------
export default connect(null, { setMovies } )(MainView);
