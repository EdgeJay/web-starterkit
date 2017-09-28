import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/signup';

class Hello extends React.PureComponent {
  render() {
    return <p style={{ fontSize: '2.0rem' }}>{this.props.store.title}</p>;
  }
}

Hello.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps('signup'), bindActions(actions))(Hello);
