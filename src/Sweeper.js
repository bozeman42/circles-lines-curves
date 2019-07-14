export default class Sweeper {
  constructor(position, direction, sweeperColor, pathColor) {
    this.position = position,
    this.direction = direction
    this.prevSpot = null
    this.sweeperColor = sweeperColor
    this.pathColor = pathColor
  }

  get end() {
    return this.position.add(this.direction).coordinates
  }

  drawPath(lineCtx) {
    lineCtx.fillStyle = this.pathColor
    lineCtx.strokeStyle = this.pathColor
    lineCtx.beginPath()
    if (this.prevSpot) {
      lineCtx.moveTo(...this.prevSpot)
      lineCtx.lineTo(...this.end)
    } else {
      // lineCtx.fillRect(...this.end,1,1)
    }
    lineCtx.stroke()
    this.prevSpot = this.end
  }

  draw(ctx) {
    ctx.strokeStyle = this.sweeperColor
    ctx.beginPath()
    const [ x, y ] = this.position.coordinates
    const [ x1, y1 ] = this.end
    ctx.moveTo(...this.position.coordinates)
    ctx.lineTo(x1, y1)
    ctx.stroke()
  }
  setPosition(x,y) {
    this.position.setVec(x,y)
  }
}