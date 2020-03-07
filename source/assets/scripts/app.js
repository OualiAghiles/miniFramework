import Accordion from './plugins/Accordion.js';

window.addEventListener('load', function () {
  new Accordion('.accordion', {
    closeAllAtStart: true,
  })
})