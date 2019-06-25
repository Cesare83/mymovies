//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Link } from "react-router-dom";

import './movie-card.scss';

//-------------------------------COMPONENTS-------------------------------------
export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card>
        <Card.Body>
          <Card.Title className="h2">{movie.Title}</Card.Title>
          <Card.Text className="description-text">{movie.Description}</Card.Text>
          <div className="details-button-container">
            <Link to={`/movies/${movie._id}`}>
              <Button className="standard-button" variant="link">View details</Button>
            </Link>
          </div>
        </Card.Body>
      </Card>
    );
  }
}
