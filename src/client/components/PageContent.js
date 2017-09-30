import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContentDiv = styled.div`
  padding-top: 2rem !important;
  background-color: #fff;
`;

const PageContent = props => (
  <ContentDiv className="column column-75">
    <div>{props.children}</div>
  </ContentDiv>
);

PageContent.defaultProps = {
  children: [],
};

PageContent.propTypes = {
  children: PropTypes.array, // eslint-disable-line react/forbid-prop-types
};

export default PageContent;
