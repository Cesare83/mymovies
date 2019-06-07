import React from 'react';
import Button from 'react-bootstrap/Button';

import { Link } from "react-router-dom";

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
         <div className="label">Name</div>
         <div className="value">{director.Name}</div>
       </div>
       <div className="director-bio">
         <div className="label">Biography</div>
         <div className="value">{director.Bio}</div>
       </div>
       <div className="director-birth">
         <div className="label">Birth</div>
         <div className="value">{director.Birth}</div>
       </div>
       <div className="director-death">
         <div className="label">Death</div>
         <div className="value">{director.Death}</div>
       </div>
       <Link to={'/'}><Button variant='primary'>Back</Button></Link>
      </div>
     );
   }
}
