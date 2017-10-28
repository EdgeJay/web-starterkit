/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import PageHeader from './PageHeader';

const CustomFontElem = styled.p`
  font-family: 'IndieFlower', san-serif, Helvetica, Arial;
`;

class Features extends React.PureComponent {
  onTestCSRFToken(evt, withToken) {
    evt.preventDefault();

    this.validateCSRFToken(withToken);
  }

  validateCSRFToken(withToken) {
    const payload = {};

    if (withToken) {
      // eslint-disable-next-line dot-notation
      payload['_csrf'] = this.props.store.csrf;
    }

    this.props.actions.validateCSRF(payload);
  }

  render() {
    const buttonLabel = 'Test CSRF token validity';
    const { enableCSRFTest } = this.props.store;

    return (
      <div>
        <PageHeader>{'Features'}</PageHeader>
        <h2>CSRF</h2>
        <h2>Custom Fonts</h2>
        <CustomFontElem>
          {'This project supports custom fonts.'}
          <br />{'(Using "Indie Flower" from Google Fonts)'}
        </CustomFontElem>
        <p dangerouslySetInnerHTML={{ __html: `Generated CSRF token is <code>${this.props.store.csrf}</code>. Tap on "${buttonLabel}" to test the token.` }} />
        <button
          onClick={evt => this.onTestCSRFToken(evt, true)}
          disabled={!enableCSRFTest}
        >{buttonLabel}</button>
        {' '}
        <button
          onClick={evt => this.onTestCSRFToken(evt, false)}
          disabled={!enableCSRFTest}
        >{'Test without CSRF token'}</button>
        <pre>{JSON.stringify(this.props.store.csrfResponse)}</pre>
      </div>
    );
  }
}

Features.propTypes = {
  actions: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
  store: PropTypes.oneOfType([
    PropTypes.object,
  ]).isRequired,
};

export default connect(mapStateToProps('main'), bindActions(actions))(Features);
