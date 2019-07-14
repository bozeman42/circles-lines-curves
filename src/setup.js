import Layer from './Layer'

const body = document.querySelector('body')

let w = 0
let h = 0

function setDimensions() {
  w = window.innerWidth
  h = window.innerHeight
}
setDimensions()

export const mainLayer = new Layer(w, h)
export const circleLayer = new Layer(w, h)
export const lineLayer = new Layer(w, h)


body.appendChild(mainLayer.canvas)

window.addEventListener('resize', e => {
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
