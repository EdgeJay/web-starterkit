import { css } from 'styled-components';

const sizes = {
  mobile: '64rem', // 640px
  tablet: '128rem', // 1280px
  desktop: '192rem', // 1920px
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(...args)}
    }
  `;

  return acc;
}, {});

export default media;
