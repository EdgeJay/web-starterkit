import manifest from '../assets/manifest.json';
import favicon from '../assets/img/favicons/favicon.ico';
import favicon128 from '../assets/img/favicons/favicon-128.png';
import favicon144 from '../assets/img/favicons/apple-touch-icon-144x144.png';
import favicon152 from '../assets/img/favicons/apple-touch-icon-152x152.png';
import favicon192 from '../assets/img/favicons/favicon-196x196.png';
import favicon256 from '../assets/img/favicons/mstile-310x310.png';
import smiley from '../assets/img/smiling.png';
import rocket from '../assets/img/space/rocket.jpg';
import indieFlower from '../assets/fonts/IndieFlower/IndieFlower.ttf';

const staticAssets = {
  manifest,
  images: {
    favicon,
    favicon128,
    favicon144,
    favicon152,
    favicon192,
    favicon256,
    smiley,
    rocket,
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
