import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';

import { Redirect } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-bootstrap';
import './profile-view.scss';
//-------------------------------COMPONENTS-------------------------------------
export class ProfileView extends React.Component {
  constructor() {
    super();

    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favouriteMovies: [],
      newusername: null,
      newpassword: null,
      newemail: null,
      newbirthday: null,
      showForm: false
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
        favouriteMovies: response.data.FavouriteMovies
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

  //update user data
  handleUpdate(event) {
    event.preventDefault();
    let username = localStorage.getItem('user');
    axios.put(`https://cesareatmymovies.herokuapp.com/users/${username}`, {
      Username: this.state.newusername,
      Password: this.state.newpassword,
      Email: this.state.newemail,
      Birthday: this.state.newbirthday
    }, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}`}
    })
    .then(response => {
      console.log(response);
      alert('Your data has been updated!');
      localStorage.setItem('user', this.state.newusername);
      this.getUser(localStorage.getItem('token'));
      this.setState({showForm: false})
    })
    .catch(event => {
      console.log('error updating the userdata');
      alert('failed to update userdata!');
    });
  };

  showForm() {
    this.setState({
      showForm: true
    })
  }

  hideForm() {
    this.setState({
      showForm: false
    })
  }

  render() {

    const {username, password, email, birthday, newusername, newpassword, newemail, newbirthday, favouriteMovies, showForm} = this.state;

    return (
      <div className="profile-view">
        {
        !this.state.showForm?
        <div className="profile-view-container">
          <div className="username">
            <h2 className="label">Username</h2>
            <div className="value">{username}</div>
          </div>
          <div className="email">
            <h2 className="label">Email</h2>
            <div className="value">{email}</div>
          </div>
          <div className="birthday">
            <h2 className="label">Birthday</h2>
            <div className="value">{birthday}</div>
          </div>
          <div className="favourite-movies">
            <h2 className="label">Favourite Movies</h2>
            {favouriteMovies.length > 0 &&
              <div className="value">{favouriteMovies.map(favMovie => ( <p key={favMovie}>{JSON.parse(localStorage.getItem('local-storage-movies')).find(movie => movie._id === favMovie).Title}</p>))}</div>
            }
          </div>
          <Button className="standard-button buttons-next" variant="link" onClick={() => this.showForm()}>Update Profile</Button>
          <Button className="standard-button buttons-next" variant="link" onClick={() => this.handleDelete()}>Delete Profile</Button>
        </div>
        :null
        }
        {
          this.state.showForm?
          <div className="update-profile-container">
            <Form>
              <Form.Group controlId="formNewUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" value={newusername} onChange={event => this.setState({newusername: event.target.value})} placeholder="enter your new username"/>
              </Form.Group>
              <Form.Group controlId="formNewPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" value={newpassword} onChange={event => this.setState({newpassword: event.target.value})} placeholder="enter your new password"/>
              </Form.Group>
              <Form.Group controlId="formNewEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" value={newemail} onChange={event => this.setState({newemail: event.target.value})} placeholder="enter your new email"/>
              </Form.Group>
              <Form.Group controlId="formNewBirthday">
                <Form.Label>Birthday</Form.Label>
                <Form.Control type="date" value={newbirthday} onChange={event => this.setState({newbirthday: event.target.value})} placeholder="MM/DD/YY"/>
              </Form.Group>
              <Button className="standard-button" variant="link" onClick={event => this.handleUpdate(event)}>Update</Button>
            </Form>
          </div>
          :null
        }

      <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
    </div>
    );
  }
}
