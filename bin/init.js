#!/usr/bin/env node
const fs = require('fs-extra')
const inquirer = require('inquirer')
const download = require('./download.js')
const {GIT_URL} = require('./const.js')

// 多种模板类型
const choices = [
  {
    name: 'd3-playground',
    value: 'd3-playground'
  }
]


// 判断目录是否为空
const checkDirectory = async (filePath, fn) => {
  let cover = false
  fs.readdir(filePath, (err, files) => {
    if (err && err.code !== 'ENOENT') {
      log.error('Can not read file', true)
      process.exit(1)
    }
    // 确认是否覆盖
    if (!(!files || !files.length)) {
      inquirer.prompt({
        message: 'There are files under this folder, Are you sure to empty it？',
        type: 'confirm',
        name: 'status',
        default: false,
      }).then(answer => {
        cover = answer.status
        if (cover) {
          fs.emptyDirSync(process.cwd())
        }
        if (fn) {
          fn()
        }
      })
    } else if (fn) {
      fn()
    }
  })
  return cover
}

module.exports = (args, options) => {
  inquirer.prompt({
    type: 'list',
    name: 'projectType',
    message: 'Select Project Type:',
    choices,
  }).then(answer => {
    if (answer.projectType === 'd3-playground') {
      checkDirectory(process.cwd(), () => {
        download(GIT_URL[answer.projectType])
      })
    }
  })
}