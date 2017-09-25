import smiling from './assets/img/smiling.png';

if (module.hot) {
  module.hot.accept();
}

const img = document.createElement('img');
img.src = smiling;
img.style.width = '150px';

document.body.appendChild(img);
