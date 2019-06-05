//-------------------------------IMPORT MODULES---------------------------------
import React, { useState } from 'react';  //use useState hook for less redundancy
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login-view.scss';


//-------------------------------COMPONENTS-------------------------------------
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return(
    <Form>
      <Form.Text controlId="formTitle">
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
      <Button variant="primary" type="submit" onClick={handleLogin}>Login</Button>
      <Form.Group controlId="formNewUser">
        <Form.Text>Or click <Button id='toRegisterView' style={{ padding: 0 }} class="btn btn-link" onClick={() => props.newUser()}>here</Button> to register</Form.Text>
      </Form.Group>
    </Form>
  );
}

//---------------------------------PROP-TYPES-----------------------------------
LoginView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  newUser: PropTypes.func.isRequired
};
