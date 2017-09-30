import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import Page from './Page';
import SideMenu from './SideMenu';

// eslint-disable-next-line
class Main extends React.PureComponent {
  render() {
    const menu = [{
      href: '/about',
      label: 'About This Repo',
    }];

    return <Page><SideMenu menu={menu} /></Page>;
  }
}

Main.propTypes = {
  // eslint-disable-next-line
  actions: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  // eslint-disable-next-line
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps('main'), bindActions(actions))(Main);
