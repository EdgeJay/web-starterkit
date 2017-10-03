import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import Page from './Page';
import SideMenu from './SideMenu';
import PageContent from './PageContent';

// eslint-disable-next-line
class Main extends React.PureComponent {
  render() {
    const menu = [{
      to: { pathname: '/' },
      label: 'Home',
    }, {
      to: { pathname: '/about' },
      label: 'About this repo',
    }, {
      to: { pathname: '/features' },
      label: 'Features',
    }, {
      to: '/libraries',
      label: 'Libraries',
    }, {
      to: '/extend',
      label: 'How to extend from this repo',
    }, {
      to: '/contact',
      label: 'Contact',
    }];

    return (
      <Page>
        <SideMenu menu={menu} />
        <PageContent>{this.props.children}</PageContent>
      </Page>
    );
  }
}

Main.defaultProps = {
  children: null,
};

Main.propTypes = {
  // eslint-disable-next-line
  actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // eslint-disable-next-line
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps('main'), bindActions(actions))(Main);
