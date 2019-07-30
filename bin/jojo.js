#!/usr/bin/env node
const pkg = require('../package.json')
const prog = require('caporal')
const init = require('./init.js')

prog.version(pkg.version)

prog
  .command('init', 'initialize')
  .action(init)

prog.parse(process.argv)