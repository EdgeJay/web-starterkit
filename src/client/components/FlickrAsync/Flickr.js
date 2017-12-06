import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActions, mapStateToProps } from '../../stores';
import * as actions from '../../actions/main';
import PageHeader from '../PageHeader';

class Flickr extends React.Component {
  componentDidMount() {
    if (typeof window === 'object') {
      this.props.actions.fetchFlickrRecents();
    }
  }

  render() {
    return (
      <div>
        <PageHeader>Flickr</PageHeader>
        <p>This page demonstrates how caching of Flickr data and images work in PWA.</p>
      </div>
    );
  }
}

Flickr.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  // eslint-disable-next-line
  store: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps('main'), bindActions(actions))(Flickr);
