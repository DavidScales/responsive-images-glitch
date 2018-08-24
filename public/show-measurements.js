// This JavaScript shows the window & image width measurements in the DOM.
// You can ignore this file, it doesn't effect the page images

const showMeasurement = (parentElem, text, width) => {
  parentElem.innerHTML = `
  <p>${text}: <span>${width}px</span></p>
  <div class="across">
    <span class="left-arrow"></span>
    <span class="line"></span>
    <span class="right-arrow"></span>
  </div><br>`;
};

const showUrl = (parentElem, text, url) => {
  const cleanUrl = url.replace(/^.*\/\/[^\/]+/, '');
  parentElem.innerHTML = `
  <br><p>${text}: <span>${cleanUrl}</span></p><br>
  `;
};

let updatingDOM = false;

const imgElem = document.querySelector('img');
const imgUrlElem = document.querySelector('#img-url');
const imgWidthElem = document.querySelector('#img-width');
const windowWidthElem = document.querySelector('#window-width');
const updatePage = () => {
  showUrl(imgUrlElem, 'Image URL', imgElem.currentSrc)
  showMeasurement(windowWidthElem, 'Window width', window.innerWidth);
  showMeasurement(imgWidthElem, 'Image width', imgElem.naturalWidth);
  updatingDOM = false;
};

const throttledResize = () => {
  if (!updatingDOM) {
    updatingDOM = true;
    window.requestAnimationFrame(updatePage);
  }
};

window.addEventListener('resize', throttledResize);

imgElem.onload = updatePage;
updatePage();