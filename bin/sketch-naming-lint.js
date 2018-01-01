#!/usr/bin/env node

const minimist = require('minimist')
const fs = require('fs')
const { excute } = require('../src/index')

const argv = minimist(process.argv.slice(2))
const commands = argv._

if (commands.length === 0) {
  console.log('Usage: sketch-naming-lint <sketch-file> [--verbose]')
  process.exit(1)
}

const fileName = commands[0]

// Check file
fs.readFile(__dirname + '/../' + fileName, (error, data) => {
  if (error) {
    process.exit(1)
  }
})

excute(fileName)
