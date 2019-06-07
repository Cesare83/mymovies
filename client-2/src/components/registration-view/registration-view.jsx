//-------------------------------IMPORT MODULES---------------------------------
import React, { useState } from 'react';  //use useState hook for less redundancy
import PropTypes from 'prop-types';
import axios from 'axios';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
      axios.post('https://cesareatmymovies.herokuapp.com/users', {
      Username: username,
      Password: password,
      EMail: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      console.log(data);
      window.open('/');
    })
    .catch(event => {
      console.log('error registering the user')
    });
  };

  return(
    <Form>
      <Form.Text>
        Register
      </Form.Text>
      <Form.Group controlId="formNewUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="your username"/>
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="your password"/>
      </Form.Group>
      <Form.Group controlId="formNewEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com"/>
      </Form.Group>
      <Form.Group controlId="formNewBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="MM/DD/YY"/>
      </Form.Group>
      <Button variant="primary" type="submit" onClick={handleRegister}>Register</Button>
    </Form>
  );
}

//---------------------------------PROP-TYPES-----------------------------------
RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired
};
