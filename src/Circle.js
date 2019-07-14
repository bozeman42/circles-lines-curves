import { Vec2 } from './math'

export default class Circle {
  constructor(x, y, r, color) {
    this.center = new Vec2(x,y)
    this.radius = r
    this.color = color
  }

  draw(ctx) {
    const [x, y] = this.center.coordinates
    ctx.strokeStyle = this.color
    ctx.globalAlpha = 0.5
    ctx.beginPath()
    ctx.arc(x,y, this.radius, 0, Math.PI * 2)
    ctx.stroke()
    ctx.globalAlpha = 1
    return this
  }

  setCenter(x,y) {
    this.center.setVec(x,y)
    return this
  }

  setRadius(r) {
    this.radius = r
  }
}