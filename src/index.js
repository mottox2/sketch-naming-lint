const fs = require('fs')
const sketch2json = require('sketch2json')
const colors = require('colors')

fs.readFile(__dirname + '/sample.sketch', (error, data) => {
  sketch2json(data).then(result => {
    const pages = result.pages
    const pageKey = Object.keys(pages)[0]
    console.log('page:', pages[pageKey].name)
    pages[pageKey].layers.map(layer => {
      // console.log(layer)
      logLayers(layer, 1)
    })
    // console.log(result.pages)
  })
})

const er = colors.red

function logLayers(layer, depth) {
  console.log(`${new Array(depth).join('  ')}${layer._class} ${layer.name}`)
  debugger
  if (layer.name.toLowerCase().match(layer._class)) {
    console.log(
      `${new Array(depth).join('  ')}Error: ${layer.name} contain ${
        layer._class
      }.`.red
    )
  }
  if (layer.name.length < 4) {
    console.log(
      `${new Array(depth).join('  ')}Error: ${layer.name} is too short`.red
    )
  }
  if (layer.layers) {
    layer.layers.map(l => logLayers(l, depth + 1))
  }
}
