/**
 *
 *
 * @class Accordion
 */
class Accordion {
  /**
   *Creates an instance of Accordion.
   * @param {*} className
   * @param {*} [options={}]
   * @memberof Accordion
   */
  constructor (className, options = {}) {
    this.options = Object.assign({}, {
      oneVisible: true,
      closeAllAtStart: false,
      openAllAtStart: false
    }, options)
    this.els = document.querySelector(className)
    this.init(this.els)
  }

  init (accordion) {
    const headers = accordion.querySelectorAll('.js-toggler')
    headers.forEach(h => {
      const parent = h.parentElement
      const content = h.nextElementSibling
      content.style.transition = 'all 0.36s ease-in-out'
      if (this.options.closeAllAtStart && !this.options.openAllAtStart) {
        this.hide(parent, content)
      } else if (this.options.openAllAtStart && !this.options.closeAllAtStart && !this.options.oneVisible) {
        this.show(parent, content)
      } else {
        if (!parent.classList.contains('active')) {
          this.hide(parent, content)
        } else {
          this.rotateIconActive(h)
        }
      }
    })
    headers.forEach(h => {
      h.addEventListener('click', () => {
        this.toggle(h)
      })
    })

  }

  hide (parent, el) {
    const height = el.offsetHeight
    el.style.height = height + 'px'
    el.offsetHeight
    el.style.height = 0
    parent.classList.remove('active')
    this.rotateIconClose(parent.querySelector('.js-toggler'))
  }

  show (parent, el) {
    el.style.height = ''
    const height = el.offsetHeight
    el.style.height = '0'
    el.offsetHeight
    el.style.height = height + 'px'
    parent.classList.add('active')
    this.rotateIconActive(parent.querySelector('.js-toggler'))
  }

  rotateIconActive (header) {
    const icon = header.querySelector('.js-icon')
    const svg = icon.querySelector('svg')
    const title = header.querySelector('span')
    // header.classList.add('border-l-2', 'border-indigo-400')
    title.classList.add('text-indigo-500')
    svg.classList.add('text-indigo-600')
    icon.style.transition = 'all 0.36s ease-in-out'
    icon.style.transform = 'rotateZ(180deg) scale(1.1)'
  }

  rotateIconClose (header) {
    const icon = header.querySelector('.js-icon')
    const svg = icon.querySelector('svg')
    const title = header.querySelector('span')
    // header.classList.remove('border-l-2', 'border-indigo-400')
    title.classList.remove('text-indigo-500')
    svg.classList.remove('stroke-curren', 'text-indigo-600')
    // svg.style.stroke = '#606F7B'
    icon.style.transform = 'rotateZ(0deg)'
  }

  toggle (h) {
    const parent = h.parentElement
    const content = h.nextElementSibling
    if (parent.classList.contains('active')) {
      this.hide(parent, content)
    } else {
      if (this.options.oneVisible) {
        const ancestor = parent.parentElement
        const activeElement = ancestor.querySelector('.active')
        if (activeElement) {
          const child = activeElement.querySelector('article')
          console.log('only one')
          this.hide(activeElement, child)
        } else {
          this.hide(parent, content)
        }
      }
      this.show(parent, content)
    }
  }
}

export default Accordion
