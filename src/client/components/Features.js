/* eslint-disable react/no-danger */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Api from '../utils/Api';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import PageHeader from './PageHeader';

class Features extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      enableCSRFTest: true,
      csrfResponse: '',
    };
  }

  onTestCSRFToken(evt, withToken) {
    evt.preventDefault();

    this.setState({
      enableCSRFTest: false,
      csrfResponse: '',
    });

    this.validateCSRFToken(withToken);
  }

  validateCSRFToken(withToken) {
    const payload = {};

    if (withToken) {
      // eslint-disable-next-line dot-notation
      payload['_csrf'] = this.props.store.csrf;
    }

    Api.post({
      path: '/validate-csrf',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      payload,
    })
      .then(response => response.json())
      .then((response) => {
        this.setState({
          enableCSRFTest: true,
          csrfResponse: JSON.stringify(response),
        });
      });
  }

  render() {
    const buttonLabel = 'Test CSRF token validity';
    const { enableCSRFTest } = this.state;

    return (
      <div>
        <PageHeader>{'Features'}</PageHeader>
        <h2>CSRF</h2>
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
        <pre>{this.state.csrfResponse}</pre>
      </div>
    );
  }
}

Features.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps('main'), bindActions(actions))(Features);
