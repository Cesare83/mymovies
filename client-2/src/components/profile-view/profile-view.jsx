import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

import { Link } from "react-router-dom";

//-------------------------------COMPONENTS-------------------------------------
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favouriteMovies: []
    };
  }

  componentDidMount() {
    //authentication
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.getUser(accessToken);
    }
  }

  //get user details
  getUser(token) {

    let username = localStorage.getItem('user');
    axios.get(`https://cesareatmymovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${token}`}
    })
    .then(response => {
      // Assign the result to the state
      this.setState({
        username: response.data.Username,
        email: response.data.Email,
        birthday: response.data.Birthday,
        favouriteMovies: response.data.Favouritemovies
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  //delete user
  handleDelete() {
    let username = localStorage.getItem('user');
    axios.delete(`https://cesareatmymovies.herokuapp.com/users/${username}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      alert('Account succesfully deleted!');
      //clears storage
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      //opens login view
      window.open('/', '_self');
    })
    .catch(event => {
      alert('failed to delete user');
    });
  }


  render() {

    const {username, email, birthday, favouriteMovies} = this.state;

    return (
      <div className="profile-view">
       <div className="username">
         <div className="label">Username</div>
         <div className="value">{username}</div>
       </div>
       <div className="email">
         <div className="label">Email</div>
         <div className="value">{email}</div>
       </div>
       <div className="birthday">
         <div className="label">Birthday</div>
         <div className="value">{birthday}</div>
       </div>
       <div className="favourite-movies">
         <div className="label">Favourite Movies</div>
         <div className="value">{favouriteMovies}</div>
       </div>
       <Button variant="primary" type="button" onClick={() => this.handleDelete()}>Delete Profile</Button>
       <Link to={'/'}><Button variant='primary'>Back</Button></Link>
      </div>
     );
   }
}
