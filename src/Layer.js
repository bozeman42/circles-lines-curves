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
    this.canvas.height = window.innerHeight
    this.canvas.width = window.innerWidth
  }
}