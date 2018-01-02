const fs = require('fs')
const sketch2json = require('sketch2json')
const colors = require('colors')

exports.excute = fileName => {
  fs.readFile(__dirname + `/../${fileName}`, (error, data) => {
    console.log(error)
    sketch2json(data).then(result => {
      const pages = result.pages
      const pageKey = Object.keys(pages)[0]
      console.log('page:', pages[pageKey].name)
      pages[pageKey].layers.map(layer => {
        lintLayers(layer, 1)
      })
    })
  })
}

const lintLayers = (layer, depth) => {
  console.log(`${new Array(depth).join('  ')}${layer._class} ${layer.name}`)
  lintLayer(layer, depth)
  if (layer.layers) {
    layer.layers.map(l => lintLayers(l, depth + 1))
  }
}

const lintLayer = (layer, depth) => {
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
}
