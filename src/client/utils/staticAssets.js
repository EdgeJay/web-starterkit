import smiley from '../assets/img/smiling.png';
import indieFlower from '../assets/fonts/IndieFlower/IndieFlower.ttf';

const staticAssets = {
  images: {
    smiley,
  },
  fonts: {
    IndieFlower: {
      400: {
        ttf: indieFlower,
      },
    },
  },
};

export function generateFontFace() {
  if (!staticAssets.fonts) {
    return '';
  }

  const arr = Object.keys(staticAssets.fonts).map(fontName => (
    Object.keys(staticAssets.fonts[fontName]).map(fontWeight => (
      `@font-face {
        font-family: "${fontName}";
        src: url(${staticAssets.fonts[fontName][fontWeight].ttf});
        font-style: normal;
        font-weight: ${fontWeight};
      }`
    )).join('\n')
  ));

  return arr.join('\n');
}

export default staticAssets;
