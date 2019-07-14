import Layer from './Layer'
import CircleWithSweeper from './CircleWithSweeper'

import './index.css'


const body = document.querySelector('body')

let w = 0
let h = 0

function setDimensions() {
  w = window.innerWidth
  h = window.innerHeight
}
setDimensions()

const mainLayer = new Layer(w, h)
const circleLayer = new Layer(w, h)
const lineLayer = new Layer(w, h)
const mainCtx = mainLayer.context

body.appendChild(mainLayer.canvas)

window.addEventListener('resize', e => {
  console.log('Resized!')
  const lineBuffer = new Layer(w,h)
  lineBuffer.context.drawImage(lineLayer.canvas,0,0)
  lineBuffer.context.stroke()
  const layers = [mainLayer, circleLayer, lineLayer]
  layers.forEach(layer => {
    layer.resize()
  })
  lineLayer.context.drawImage(lineBuffer.canvas,0,0)
  lineLayer.context.stroke()
  setDimensions()
})

let circleX = 900
let circleY = 450
const aCircle = new CircleWithSweeper(circleX,circleY,200, 50, circleLayer, lineLayer)
aCircle.addChild(150,170)
aCircle.addChild(75,-500)
aCircle.addChild(5,1500)
aCircle.addChild(55,400)
let prevTime = null
function update(time) {
  let dT = 0
  if (prevTime) {
    dT = (time - prevTime) / 1000
  }
  mainCtx.clearRect(0,0,w, h)
  circleLayer.context.clearRect(0,0,w, h)
  aCircle.update(dT, mainCtx)
  aCircle.draw(mainCtx)
  prevTime = time
  requestAnimationFrame(update)
}

update()
