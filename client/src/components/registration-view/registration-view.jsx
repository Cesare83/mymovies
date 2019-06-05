//-------------------------------IMPORT MODULES---------------------------------
import React, { useState } from 'react';  //use useState hook for less redundancy
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export function RegistrationView(props) {
  const [username, setUsername ] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onLoggedIn(username);
    props.onSignedIn();
  };

  return(
    <Form>
      <Form.Text controlId="formTitle">
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
      <Button variant="primary" type="submit" onClick={handleSignIn}>Register</Button>
    </Form>
  );
}

//---------------------------------PROP-TYPES-----------------------------------
RegistrationView.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  birthday: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
  onSignedIn: PropTypes.func.isRequired
};
