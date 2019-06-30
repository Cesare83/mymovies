//-------------------------------IMPORT MODULES---------------------------------
import React, { useState } from 'react';  //use useState hook for less redundancy
import PropTypes from 'prop-types';
import axios from 'axios';

import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';

//-------------------------------FUNCTIONS--------------------------------------
export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (event) => {
    event.preventDefault();
      axios.post('https://budspencermovies.herokuapp.com/users', {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday
    })
    .then(response => {
      const data = response.data;
      props.onRegistered(username);
      console.log(data);
      window.open('/', '_self');
    })
    .catch(event => {
      console.log('error registering the user')
    });
  };

  return(
    <div className="registration-view">
    <Form id="register-form">
      <Form.Group controlId="formNewUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="enter your username"/>
      </Form.Group>
      <Form.Group controlId="formNewPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="enter your password"/>
      </Form.Group>
      <Form.Group controlId="formNewEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="example@email.com"/>
      </Form.Group>
      <Form.Group controlId="formNewBirthday">
        <Form.Label>Birthday</Form.Label>
        <Form.Control type="date" value={birthday} onChange={e => setBirthday(e.target.value)} placeholder="MM/DD/YY"/>
      </Form.Group>
      <Button className="standard-button" variant="link" onClick={handleRegister}>Register</Button>
    </Form>

    <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
    </div>
  );
}

//---------------------------------PROP-TYPES-----------------------------------
RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired
};
