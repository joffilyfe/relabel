#!/usr/bin/env node
const program = require('commander')

program
  .command('list', 'List issues')
  .command('change-labels', 'Change all labels according change table')
  .parse(process.argv)
