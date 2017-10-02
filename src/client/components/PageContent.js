import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import media from '../utils/media';

const ContentDiv = styled.div`
  padding-top: 2rem !important;
  background-color: #fff;

  ${media.tablet`
    padding-left: 33rem !important;
  `}
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
