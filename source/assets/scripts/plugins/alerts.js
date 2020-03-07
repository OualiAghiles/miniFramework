export default class Alert {
  constructor (className) {
    this.alertsHandler = document.querySelectorAll(className)
  }

  show (event) {

  }

  hide () {

  }

  close () {

  }

  getInfo (elment) {

  }

  createAlert () {
    const html = ''
    return html
  }

  initHandler () {
    const alerts = Array.from(this.alertsHandler)
    alerts.forEach(alert => {
      alert.addEventListener('click', (e) => {
        e.preventDefault()
        this.show(e)
      })
    })
  }
}
