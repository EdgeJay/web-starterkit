import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import Page from './Page';
import SideMenu from './SideMenu';
import PageContent from './PageContent';

class Main extends React.PureComponent {
  render() {
    const menu = [
      {
        to: { pathname: '/' },
        label: 'Home',
      },
      {
        to: { pathname: '/about' },
        label: 'About this repo',
      },
      {
        to: { pathname: '/features' },
        label: 'Features',
      },
      {
        to: { pathname: '/flickr' },
        label: 'Flickr',
      },
      {
        to: '/libraries',
        label: 'Libraries',
      },
      {
        to: '/extend',
        label: 'How to extend from this repo',
      },
      {
        to: '/contact',
        label: 'Contact',
      },
    ];

    return (
      <Page>
        <SideMenu menu={menu} />
        <PageContent>{this.props.children}</PageContent>
      </Page>
    );
  }
}

Main.defaultProps = {
  children: <div />,
};

Main.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default connect(mapStateToProps('main'), bindActions(actions))(Main);
