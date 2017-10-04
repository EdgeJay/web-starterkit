/* eslint-disable react/no-danger */
/* eslint-disable max-len */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActions, mapStateToProps } from '../stores';
import * as actions from '../actions/main';
import PageHeader from './PageHeader';

class Features extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      enableCSRFTest: true,
    };
  }

  onTestCSRFToken(evt) {
    evt.preventDefault();

    this.setState({
      enableCSRFTest: false,
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
        <form action="/validate-csrf" method="POST">
          <input type="hidden" name="_csrf" value={this.props.store.csrf} />
          <button
            onClick={evt => this.onTestCSRFToken(evt)}
            disabled={!enableCSRFTest}
          >{buttonLabel}</button>
        </form>
      </div>
    );
  }
}

Features.propTypes = {
  store: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default connect(mapStateToProps('main'), bindActions(actions))(Features);
