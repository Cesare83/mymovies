//-------------------------------IMPORT MODULES---------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';

import { setFilter } from '../../actions/actions';

//-------------------------------FUNCTIONS--------------------------------------
function VisibilityFilterInput(props) {
  return <Form.Control
    onChange={e => props.setFilter(e.target.value)}
    value={props.visibilityFilter}
    placeholder="filter"
  />;
}

//----------------------------------STORE CONNECTION----------------------------
export default connect(
  ({visibilityFilter}) => ({visibilityFilter}),
  { setFilter }
)(VisibilityFilterInput);
