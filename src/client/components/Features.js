/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import PageHeader from './PageHeader';

const Features = props => (
  <div>
    <PageHeader>{'Features'}</PageHeader>
    <h2>CSRF</h2>
    <p dangerouslySetInnerHTML={{ __html: `Generated CSRF token is <code>${props.store.csrf}</code>. Tap on "Test CSRF token validity" to test the token.` }} />
    <form action="/validate-csrf" method="POST">
      <input type="hidden" name="_csrf" value={props.store.csrf} />
      <button type="submit">Test CSRF token validity</button>
    </form>
  </div>
);

Features.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps('main'), bindActions(actions))(Features);
