//-------------------------------IMPORT MODULES---------------------------------
import React, { useState } from 'react';  //use useState hook for less redundancy
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { Link } from 'react-router-dom';
import './login-view.scss';


//-------------------------------COMPONENTS-------------------------------------
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    //send a request to the server for the authentication
    axios.post('https://cesareatmymovies.herokuapp.com/login/', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
  };

  return(
    <Form>
      <Form.Text>
        Login
      </Form.Text>
      <Form.Group controlId="formEnterUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Enter username" />
      </Form.Group>
      <Form.Group controlId="formEnterPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
      </Form.Group>
      <Button className="standard-button" variant="link" onClick={handleLogin}>Login</Button>
      <Form.Group controlId="formNewUser">
        <Form.Text id="register-link">Or click <Link to={`/register`}>here</Link> to register</Form.Text>
      </Form.Group>
    </Form>
  );
}

//---------------------------------PROP-TYPES-----------------------------------
LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
