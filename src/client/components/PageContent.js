import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentDiv = styled.div`
  padding-top: 2rem !important;
  padding-left: 33rem !important;
  background-color: #fff;
`;

const PageContent = props => (
  <ContentDiv className="column">
    <div>{props.children}</div>
  </ContentDiv>
);

PageContent.defaultProps = {
  children: null,
};

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]), // eslint-disable-line react/forbid-prop-types
};

export default PageContent;
