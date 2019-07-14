import CircleWithSweeper from './CircleWithSweeper'

import { mainLayer, lineLayer, circleLayer } from './setup'

import './index.css'

let sweeperCircle
let circleX = 900
let circleY = 450

let currentAnimation
let prevTime = null
let count = 0
let mode = 'none'
let iterator = 1
function setup(type) {
  cancelAnimationFrame(currentAnimation)
  if (type === 'square') {
    if (mode !== 'square') {
      mode = 'square'
      iterator = 1
      sweeperCircle = new CircleWithSweeper(circleX,circleY,200/iterator,Math.PI * iterator / 2, 0, circleLayer, lineLayer)
    } else {
      iterator += 1
      prevTime = null
      count = 0
      sweeperCircle.addChild(200/iterator,Math.PI * iterator / 2 )
      function resetAngle(sweeperCircle, angle) {
        sweeperCircle.sweeper.direction.angle = angle
        if (sweeperCircle.child) {
          resetAngle(sweeperCircle.child, angle)
        }
      }
      resetAngle(sweeperCircle, 0)
    }
  } else {
    if (mode !== 'random') {
      mode = 'random'
      iterator = 1
      sweeperCircle = new CircleWithSweeper(circleX, circleY, Math.random() * 100, Math.random() * 4 * Math.PI - (2 * Math.PI), Math.random() * Math.PI * 2,circleLayer, lineLayer)
    } else {
      iterator++
      sweeperCircle.addChild(Math.random() * 200 / (1 + Math.random()), Math.random() * 6 * Math.PI - (3 * Math.PI), Math.random() * 2 * Math.PI)
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
    sweeperCircle.update(dT, mainLayer.context)
    sweeperCircle.draw(mainLayer.context)
  }
  prevTime = time
  count++
  currentAnimation = requestAnimationFrame(update)
}

