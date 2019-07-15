import CircleWithSweeper from './CircleWithSweeper'

import { mainLayer, lineLayer, circleLayer } from './setup'

import './index.css'

let sweeperCircle
let circleX = 0
let circleY = 450

let currentAnimation
let prevTime = null
let count = 0
let mode = 'none'
let iterator = 1
function setup(type) {
  const height = window.innerHeight
  const width = window.innerWidth
  cancelAnimationFrame(currentAnimation)
  if (type === 'square') {
    if (mode !== 'square') {
      mode = 'square'
      iterator = 1
      sweeperCircle = new CircleWithSweeper(circleX,circleY,((height - 100) / 4)/iterator,Math.PI * iterator / 2, 0, circleLayer, lineLayer)
      sweeperCircle.addChild(((height - 100) / 4) /iterator, -1 * (Math.PI * iterator / 2), Math.PI)
    } else {
      iterator += 2
      prevTime = null
      count = 0
      sweeperCircle.addChild(((height - 100) / 4) /iterator, Math.PI * iterator / 2, 0)
      sweeperCircle.addChild(((height - 100) / 4) /iterator, -1 * (Math.PI * iterator / 2), Math.PI)
      sweeperCircle.resetAngle()
    }
  } else {
    const radius = Math.random() * ((height - 100) / 4) /iterator
    const angularVelocity = Math.random() * 6 * Math.PI - (3 * Math.PI)
    if (mode !== 'random') {
      mode = 'random'
      iterator = 1
      sweeperCircle = new CircleWithSweeper(circleX, circleY, radius, angularVelocity, 0, circleLayer, lineLayer)
      sweeperCircle.addChild(radius, -angularVelocity, Math.PI)
    } else {
      iterator++
      sweeperCircle.addChild(radius, angularVelocity, 0)
      sweeperCircle.addChild(radius, -angularVelocity, Math.PI)
      sweeperCircle.resetAngle()
    }
  }
  prevTime = null
  count = 0
  currentAnimation = requestAnimationFrame(update)
}

const squareWaveButton = document.getElementById('square-wave')
const randomButton = document.getElementById('random')

randomButton.onclick = e => {
  lineLayer.clear()
  setup()
}

squareWaveButton.onclick = e => {
  mainLayer.clear()
  circleLayer.clear()
  lineLayer.clear()
  setup('square')
}

function update(time) {
  let dT = 0
  if (prevTime) {
    dT = count > 5 ? (time - prevTime) / 2500 : 0
    mainLayer.clear()
    circleLayer.clear()
    circleX++
    if (circleX > window.innerWidth) {
      circleX = 0
      lineLayer.clear()
    }
    sweeperCircle.setCenter(circleX, circleY)
    sweeperCircle.update(dT, mainLayer.context)
    sweeperCircle.draw(mainLayer.context)
    if (circleX === 0) {
      lineLayer.clear()
    }
  }
  prevTime = time
  count++
  currentAnimation = requestAnimationFrame(update)
}

