#!/usr/bin/env node

const fs = require('fs-extra')
const sh = require('shelljs')
const ora = require('ora')
const rimraf = require('rimraf')
const path = require('path')
const jsonfile = require('jsonfile')

const spinner = ora('downloading template ...\n')

const changePkg = async () => {
  const file = `${process.cwd()}/package.json`
  const defaultConfig = jsonfile.readFileSync(file)
  const dirName = process.cwd().split('/').pop()

  defaultConfig.name = dirName
  defaultConfig.main = `lib/${dirName}.min.js`
  defaultConfig.module = `es/${dirName}.es.js`

  jsonfile.writeFile(file, defaultConfig, {spaces: 2}, err => {
    if (err) console.error(err)
  })
}

module.exports = (url, projectType) => {
  spinner.color = 'green'
  spinner.start()
  
  sh.exec(`git clone ${url}`)

  const folder = url.split('/').pop().slice(0, -4)
  fs.copySync(folder, process.cwd())

  rimraf(folder, err => {
    if (!err) {
      if (projectType === 'react-component') {
        changePkg()
      }
      spinner.text = 'Success'
      spinner.succeed()
    }
  })

  rimraf(`${process.cwd()}/.git`, err => {
    if (err) {
      console.log('error')
    }
  })
}