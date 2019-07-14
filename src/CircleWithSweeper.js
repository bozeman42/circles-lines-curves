import Circle from './Circle'
import Sweeper from './Sweeper'
import { Vec2 } from './math'

const CIRCLE_COLOR = 'black'
const SWEEPER_COLOR = 'yellow'
const PATH_COLOR = 'deepskyblue'

export default class CircleWithSweeper {
  constructor( x, y, radius, rotation, circleLayer, lineLayer ) {
    this.circle = new Circle(x,y,radius, CIRCLE_COLOR)
    this.sweeper = new Sweeper(new Vec2(x,y), new Vec2(radius,0), SWEEPER_COLOR, PATH_COLOR)
    this.rotation = rotation
    this.circleLayer = circleLayer
    this.lineLayer = lineLayer
    this.child = null
  }

  setCenter(x,y) {
    this.circle.setCenter(x,y)
    this.sweeper.setPosition(x,y)
  }

  addChild(radius, rotation) {
    if(this.child){
      this.child.addChild(radius, rotation)
    } else {
      this.child = new CircleWithSweeper(...this.sweeper.end, radius, rotation, this.circleLayer, this.lineLayer)
    }
    return this
  }

  draw(ctx) {
    this.circle.draw(this.circleLayer.context)
    this.sweeper.draw(this.circleLayer.context, this.lineLayer.context)
    ctx.drawImage(this.circleLayer.canvas, 0,1)
    ctx.drawImage(this.lineLayer.canvas, 0,1)
    ctx.stroke()
    if (!this.child) {
      this.sweeper.drawPath(this.lineLayer.context)
    } else {
      this.child.draw(ctx)
    }
  }

  update(dT, ctx) {
    this.rotate( this.rotation * dT )
    if (this.child) {
      this.child.setCenter(...this.sweeper.end)
      this.child.update(dT, ctx)
    }
  }

  rotate(angle) {
    this.sweeper.direction.rotate(angle)
  }
}