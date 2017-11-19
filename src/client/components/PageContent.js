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
  <ContentDiv className="column">{props.children}</ContentDiv>
);

PageContent.defaultProps = {
  children: <div />,
};

PageContent.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]),
};

export default PageContent;
