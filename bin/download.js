const fs = require('fs-extra')
const sh = require('shelljs')
const ora = require('ora')
const rimraf = require('rimraf')

const spinner = ora('downloading template ...\n')

module.exports = url => {
  spinner.color = 'green'
  spinner.start()
  
  sh.exec(`git clone ${url}`)

  const folder = url.split('/').pop().slice(0, -4)

  fs.copySync(folder, process.cwd())

  rimraf(folder, err => {
    if (!err) {
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