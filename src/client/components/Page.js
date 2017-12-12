import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const Container = styled.div`
  padding: 0 1rem;
  max-width: 100%;
  height: 100%;
`;

const Row = styled.div`
  height: 100%;
`;

const Page = props => (
  <Container className="container">
    <Row className="row">{props.children}</Row>
  </Container>
);

Page.defaultProps = {
  children: <div />,
};

Page.propTypes = {
  children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
};

export default Page;
