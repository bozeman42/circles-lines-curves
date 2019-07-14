export default class Layer {
  constructor(width, height) {
    this.width = width
    this.height = height
    this.canvas = this.createCanvas(width, height)
    this.context = this.canvas.getContext('2d')
  }

  createCanvas(w,h) {
    const canvas = document.createElement('canvas')
    canvas.width = w
    canvas.height = h
    return canvas
  }

  resize() {
    this.height = window.innerHeight
    this.width = window.innerWidth
    this._resizeCanvas()
  }

  _resizeCanvas() {
    this.canvas.height = this.height
    this.canvas.width = this.width
  }

  clear() {
    this.context.clearRect(0, 0, this.width, this.height)
  }
}