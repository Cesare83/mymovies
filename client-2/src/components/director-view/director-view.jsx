import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";
import './director-view.scss';

//-------------------------------COMPONENTS-------------------------------------
export class DirectorView extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    const { director } = this.props;

    if (!director) return null;

    return (
      <div className="director-view">
       <div className="director-name">
         <h2 className="label">Name</h2>
         <div className="value">{director.Name}</div>
       </div>
       <div className="director-bio">
         <h2 className="label">Biography</h2>
         <div className="description-text">{director.Bio}</div>
       </div>
       <div className="director-birth">
         <h2 className="label">Birth</h2>
         <div className="value">{director.Birth}</div>
       </div>
       <div className="director-death">
         <h2 className="label">Death</h2>
         <div className="value">{director.Death}</div>
       </div>
       <Link to={'/'}><Button className="standard-button" variant="link">Back</Button></Link>
      </div>
     );
   }
}
