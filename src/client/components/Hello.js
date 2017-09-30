import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';

class Hello extends React.PureComponent {
  render() {
    return <p style={{ fontSize: '2.0rem' }}>{this.props.store.title}</p>;
  }
}

Hello.propTypes = {
  // eslint-disable-next-line
  actions: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.func,
  ]).isRequired,
  store: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.string,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps('main'), bindActions(actions))(Hello);
