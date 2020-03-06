/**
 * @export
 * @class Zoomer
 *
 * @example new Zoomer('.nsc_vid', '5UsGnjPYxLU')
 */
class Zoomer {
  /**
   * Creates an instance of Zoomer.
   * @param {String} className - class to active the animation and luch the video
   * @param {string} [yLink='SBB1YtwODT0']  - Youtube ID
   * @memberof Zoomer
   * @example new Zoomer('.nsc_vid', '5UsGnjPYxLU')
   */
  constructor (className, yLink = 'ffAZcktrh9c') {
    this.el = document.querySelector(className)
    this.yLink = yLink
    this.container = this.el.querySelector('.nsc-vid')
    this.img = this.container.querySelector('img')
    this.img.src = `https://img.youtube.com/vi/${this.yLink}/maxresdefault.jpg`
    this.element = this.el.cloneNode(true)
    this.element.classList.add('zoomer')
    this.container.addEventListener('click', this.startVid.bind(this))
  }

  /**
   *
   * @description Return HTML element spinner
   * @returns {String}  loader html structure for the loader
   */
  spinnerElement () {
    const loader = `
      <div class="loader">
        <svg class="circular" viewBox="25 25 50 50">
          <circle
            class="path"
            cx="50"
            cy="50"
            r="20"
            fill="none"
            stroke-width="4"
            stroke-miterlimit="10"
            />
        </svg>
      </div>`
    return loader
  }

  /**
   * Add animations to the element zoomed
   *
   * @memberof Zoomer
   */
  setStyles () {
    const pos = this.calculateOffset()
    const zoomer = document.querySelector('.zoomer')
    const elvid = zoomer.querySelector('.nsc-vid')
    document.body.style.overflow = 'hidden'
    document.body.height = '100vh'
    elvid.style.width = this.position.width + 'px'
    zoomer.style.position = 'absolute'
    zoomer.style.top = this.position.y + 'px'
    zoomer.style.left = this.position.x + 'px'
    zoomer.style.transform = `translate3d(${pos.offsetX}px, ${pos.offsetY}px, 200px) scale(1.5)`
    zoomer.style.zIndex = '200'
    elvid.style.transition = 'transform 0.4s cubic-bezier(.4,0,0,1)'
    elvid.style.transform = 'rotateZ(0deg)'
    this.addIframe()
    document.body.offsetWidth
    this.waitVid(this.parent)
  }

  /**
   *
   *
   * @returns {Object} {offsetX, offsetY, positionX, positionY} - Position where element translate
   * @memberof Zoomer
   */
  calculateOffset () {
    this.position = this.el.getBoundingClientRect()
    const ox = this.getWindowCenter()
    let transX = 0
    let transY = 0
    let positionX = 0
    let positionY = 0
    if (ox.x > this.position.x) {
      transX = ox.x - (this.position.x + (this.position.width / 2))
      positionX = ox.x - transX
    } else if (ox.x <= this.position.x) {
      transX = -((this.position.x + (this.position.width / 2)) - ox.x)
      positionX = ox.y - transX
    }
    if (ox.y > this.position.y) {
      transY = ox.y - (this.position.y + (this.position.height / 2))
      positionY = ox.y - transY
    }
    if (ox.y < this.position.y) {
      transY = -((this.position.y + (this.position.height / 2)) - ox.y)
      positionY = ox.y - transY
    }
    return {
      offsetX: transX,
      offsetY: transY,
      positionX,
      positionY
    }
  }

  /**
   *
   * Calculate the center of the window
   * @returns {Object} {x,y} - position of the center of the window
   * @memberof Zoomer
   */
  getWindowCenter () {
    const docEl = document.documentElement
    const windowWidth = Math.min(docEl.clientWidth, window.innerWidth)
    const windowHeight = Math.min(docEl.clientHeight, window.innerHeight)

    return {
      x: windowWidth / 2,
      y: windowHeight / 2
    }
  }

  /**
   * Add animations to replace the element at his initial place
   *
   * @memberof Zoomer
   */
  removeStyles () {
    const zoomer = document.querySelector('.zoomer')
    const vid = zoomer.querySelector('.nsc-vid')
    zoomer.style.display = 'block'
    zoomer.style.position = 'absolute'
    zoomer.style.left = this.position.x + 'px'
    zoomer.style.top = this.position.y + 'px'
    zoomer.style.transition = 'all 0.4s , opacity 0.15s ease '
    zoomer.style.transform = `translate3d(${0}px, ${0}px, 0) scale(1) rotateZ(-20deg)`
    zoomer.style.zIndex = '20'
    vid.style.transition = 'rotate 0.4s ease'
    vid.style.transform = 'rotateZ(0deg)'
    document.body.style.overflow = ''
    document.body.minHeight = 'auto'
  }

  /**
   * Add overlay element to the page
   * @returns {HTMLElement} .overlay - html elment overlay where the iframe will be added
   */
  addOverlay () {
    const overlay = `<div class="overlay">
    <span class="close">
        <svg fill="#ffffff" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48px" height="48px"><path d="M 4.9902344 3.9902344 A 1.0001 1.0001 0 0 0 4.2929688 5.7070312 L 10.585938 12 L 4.2929688 18.292969 A 1.0001 1.0001 0 1 0 5.7070312 19.707031 L 12 13.414062 L 18.292969 19.707031 A 1.0001 1.0001 0 1 0 19.707031 18.292969 L 13.414062 12 L 19.707031 5.7070312 A 1.0001 1.0001 0 0 0 18.980469 3.9902344 A 1.0001 1.0001 0 0 0 18.292969 4.2929688 L 12 10.585938 L 5.7070312 4.2929688 A 1.0001 1.0001 0 0 0 4.9902344 3.9902344 z"/></svg>
    </span>
</div>`
    const container = this.element.querySelector('.nsc-vid')
    document.body.appendChild(this.element)
    document.body.insertAdjacentHTML('beforeend', overlay)
    container.querySelector('.yt-icon').style.display = 'none'
    container.insertAdjacentHTML('afterBegin', this.spinnerElement())
  }

  /**
   * call the generator iframe
   * Add iframe as child of .overlay
   * @returns {HTMLElement} iframe video youtube
   */
  addIframe () {
    const iframe = this.iframe()
    this.parent = document.querySelector('.overlay')
    this.parent.style.opacity = '1'
    this.parent.insertAdjacentHTML('beforeend', iframe)
  }

  /**
   *
   * @memberof Zoomer
   */
  startVid () {
    const center = this.getWindowCenter()
    this.addOverlay()
    this.setStyles(center)
    this.addEventListeners()

    // force repaint dom
  }

  /**
   * @description Add the iframe to the page wen the animation start
   * @param {number} n number of seconds
   * @returns {HTMLElement} iframe tag html
   */
  iframe (n) {
    const w = this.position.width * 1.5
    const h = this.position.height * 1.5
    return `<iframe
            style="display:none;"
            width="${w}",
            height="${h}",
            src = 'https://www.youtube.com/embed/${this.yLink}?autoplay=1',
            frameborder="0",
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture",
            allowfullscreen="allowfullscreen"></iframe>`
  }

  /**
   *
   * @param {HTMLElement} parent
   */
  waitVid (parent) {
    const v = parent.querySelector('iframe')
    const spinnerEl = this.element.querySelector('.loader')
    const zoomer = document.querySelector('.zoomer')
    // wait the loanding video then remove spinner and thumb img
    v.onload = () => {
      zoomer.style.zIndex = '-1'
      zoomer.style.opacity = '0'
      v.style.display = 'block'
      spinnerEl.parentElement.removeChild(spinnerEl)
    }
  }

  /**
   * MaKe the animation to close the video
   * @returns {void}
   */
  closeVid () {
    const video = this.parent.querySelector('iframe')
    const spinnerEl = this.parent.querySelector('.loader')
    const zoomer = document.querySelector('.zoomer')
    if (spinnerEl) spinnerEl.parentElement.removeChild(spinnerEl)
    zoomer.style.zIndex = '200'
    zoomer.style.opacity = '1'
    zoomer.querySelector('.yt-icon').style.display = 'block'

    if (video) video.parentElement.removeChild(video)
    this.parent.style.transition = 'opacity 0.4s ease-out'
    this.parent.style.opacity = '0'
    this.removeStyles()
    document.body.height = 'auto'
    setTimeout(() => {
      this.parent.remove()
      this.element.remove()
    }, 400)
  }

  /**
   * @description handle event click ans escape and active the remove event after execute
   * @returns {void}
   */
  addEventListeners () {
    window.addEventListener('click', this.windowCloseClickRef = this.windowCloseClick.bind(this))
    window.addEventListener('keyup', this.handleEscRef = this.handleEsc.bind(this))
  }

  /**
   * @description on click outside the video or on close btn the lightbox close then remove the eventListener
   * @param {mouseEvent} e - click event
   * @example window.addEventListener('click', this.windowCloseClickRef = this.windowCloseClick.bind(this))
   */
  windowCloseClick (e) {
    // add condition to close the sidebar event with the clsoe btn
    if (e.target.closest('.overlay') !== null || e.target.closest('.close')) {
      this.closeVid()
      window.removeEventListener('click', this.windowCloseClickRef)
    }
  }

  /**
   * target the keyup Escape to hide
   * @param {Event} e
   */
  handleEsc (e) {
    if (e.key === 'Escape') {
      this.closeVid()
      window.removeEventListener('keyup', this.handleEscRef)
    }
  }
}

export default Zoomer
