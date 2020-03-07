import Accordion from './plugins/Accordion.js';

window.addEventListener('load', function () {
  const acc1 = new Accordion('.js-accordion', {
    closeAllAtStart: true,
    oneVisible: false
  })
  acc1.init()
  const acc2 = new Accordion('.js-accordion-2')
  acc2.init()
  const acc3 = new Accordion('.js-accordion-3', {
    closeAllAtStart: false,
    oneVisible: false,
    openAllAtStart: true
  })
  acc3.init()
})
