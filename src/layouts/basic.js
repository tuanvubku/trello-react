import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { connect } from 'react-redux';

import Button from '@material-ui/core/Button';

class BasicLayout extends React.Component {
  render() {
    return <div>{this.props.children}</div>;
  }
}

export default BasicLayout;
