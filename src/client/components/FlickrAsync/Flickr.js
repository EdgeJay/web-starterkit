import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { bindActions, mapStateToProps } from '../../stores';
import * as actions from '../../actions/main';
import PageHeader from '../PageHeader';

const Row = styled.div`
flex-wrap: wrap;
`;

function generateImageUrl({ id, farm, secret, server }) {
  return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}_m.jpg`;
}

class Flickr extends React.Component {
  componentDidMount() {
    if (typeof window === 'object') {
      this.props.actions.fetchFlickrRecents();
    }
  }

  render() {
    const { photos } = this.props.store.xhr.flickrRecents || {};
    const results = (photos && photos.photo) || [];
    let key = 0;

    return (
      <div>
        <PageHeader>Flickr</PageHeader>
        <p>This page demonstrates how caching of Flickr data and images work in PWA.</p>
        <div className="container">
          <Row className="row">{
            results.map((item) => {
              key += 1;

              return (
                <div key={key} className="column column-33">
                  <img src={generateImageUrl(item)} alt={item.title} title={item.title} />
                </div>
              );
            })
          }</Row>
        </div>
      </div>
    );
  }
}

Flickr.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  store: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps('main'), bindActions(actions))(Flickr);
