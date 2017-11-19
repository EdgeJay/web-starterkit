import React from 'react';

// Original source code taken from this gist: https://gist.github.com/acdlite/a68433004f9d6b4cbc83b5cc3990c194
// getComponent is a function that returns a promise for a component
// It will not be called until the first mount
export default function asyncComponent(getComponent) {
  class AsyncComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = { Component: AsyncComponent.Component };
    }

    componentWillMount() {
      if (!this.state.Component) {
        getComponent().then((Component) => {
          AsyncComponent.Component = Component;
          this.setState({ Component });
        });
      }
    }

    render() {
      const { Component } = this.state;
      if (Component) {
        return <Component {...this.props} />;
      }
      return null;
    }
  }

  AsyncComponent.Component = null;

  return AsyncComponent;
}
