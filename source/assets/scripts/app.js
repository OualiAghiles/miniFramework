import Accordion from './plugins/Accordion.js';

window.addEventListener('load', function () {
  new Accordion('.js-accordion', {
    closeAllAtStart: true,
  })
  new Accordion('.js-accordion-2', {
    closeAllAtStart: false,
    oneVisible: false
  })
})