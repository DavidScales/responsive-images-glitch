// This JavaScript shows the window & image width measurements in the DOM.
// You can ignore this file, it doesn't effect the page images

// TODO: throttle the resize event listener
const imgElem = document.querySelector('img');
const imgUrlElem = document.querySelector('#img-url');
const imgWidthElem = document.querySelector('#img-width');
const windowWidthElem = document.querySelector('#window-width');
const updatePage = () => {
  imgUrlElem.textContent = imgElem.currentSrc.replace(/^.*\/\/[^\/]+/, '');
  imgWidthElem.textContent = imgElem.naturalWidth + 'px';
  windowWidthElem.textContent = window.innerWidth + 'px';
};
imgElem.onload = updatePage;
updatePage();
window.addEventListener('resize', updatePage);