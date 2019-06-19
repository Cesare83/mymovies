//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
import './genre-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export class GenreView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { genre } = this.props;

    if (!genre) return null;

    return (
      <div className="genre-view">
       <div className="genre-name">
         <h2 className="label">Name</h2>
         <div className="value">{genre.Name}</div>
       </div>
       <div className="genre-description">
         <h2 className="label">Description</h2>
         <div id="genre-description-text" className="description-text">{genre.Description}</div>
       </div>
       <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
      </div>
     );
   }
}
