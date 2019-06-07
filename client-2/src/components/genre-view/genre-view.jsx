import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

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
      <div className="director-view">
       <div className="director-name">
         <div className="label">Name</div>
         <div className="value">{genre.Name}</div>
       </div>
       <div className="director-bio">
         <div className="label">Description</div>
         <div className="value">{genre.Description}</div>
       </div>
       <Link to={'/'}><Button variant='primary'>Back</Button></Link>
      </div>
     );
   }
}
