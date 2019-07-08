//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import Button from 'react-bootstrap/Button';
import { connect } from 'react-redux';

import { Link } from "react-router-dom";
import './director-view.scss';

//-------------------------------FUNCTIONS--------------------------------------
function DirectorView(props) {

  const { movies, directorName } = props;

  if (!movies || !movies.length) return null;

  const director = movies.find(movie => movie.Director.Name == directorName).Director;

    return (
      <div className="director-view">
       <div className="director-name">
        <h2 className="subview-title">{director.Name}</h2>
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

//----------------------------------STORE CONNECTION----------------------------
export default connect(({movies}) => ({movies}))(DirectorView);
