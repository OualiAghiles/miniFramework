export default class Alert {
  constructor (className) {
    this.alertsHandler = document.querySelectorAll(className)
  }

  show (event, info) {
    this.createAlert()
    this.initClose(info.target)
  }

  hide (el) {
    const closeClass = el.dataset.out
    const openClass = el.dataset.in
    el.classList.remove(openClass)
    el.classList.add(closeClass)
  }

  close (el) {
    this.hide(el)
    setTimeout(() => {
      el.remove()
    }, 400)
  }

  getInfo (elment) {

  }

  createAlert (info) {
    const html = ''
    return html
  }

  initHandler () {
    const alerts = Array.from(this.alertsHandler)
    alerts.forEach(alert => {
      alert.addEventListener('click', (e) => {
        const info = this.getInfo(alert)
        e.preventDefault()
        this.show(e, info)
      })
    })
  }

  initClose (target) {
    const targetEl = document.querySelector(target)
    const close = targetEl.querySelector('.close')
    close.addEventListener('click', () => {
      this.close(targetEl).band(this)
    })
  }
}
