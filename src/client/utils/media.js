import { css } from 'styled-components';

const sizes = {
  tablet: '40rem', // 400px
  desktop: '80rem', // 800px
  tv: '120rem', // 1200px
};

const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});

export default media;
