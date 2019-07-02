//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setFilter } from '../../actions/actions';

import Form from 'react-bootstrap/Form';
import './visibility-filter-input.scss';

//-------------------------------FUNCTION--------------------------------------
function VisibilityFilterInput(props) {
  return <div className="container">
    <Form.Control id="visibility-filter"
      onChange={e => props.setFilter(e.target.value)}
      value={props.visibilityFilter}
      placeholder="search movie by title"
    />
  </div>
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(
  ({visibilityFilter}) => ({visibilityFilter}),
  { setFilter }
)(VisibilityFilterInput);
