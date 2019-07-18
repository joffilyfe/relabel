#!/usr/bin/env node
const program = require('commander')
const package = require('../package.json')

program
  .version(package.version)
  .command('issues <options>', 'Execute operations on issues')

program
  .parse(process.argv)
