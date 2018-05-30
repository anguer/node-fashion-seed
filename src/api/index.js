/**
 * Created by yangyue on 2018/4/12.
 */
const fs = require('fs')
const path = require('path')

const apis = []

fs
  .readdirSync(__dirname)
  .filter(function (file) {
    return (file.indexOf('.') !== 0) && (file !== 'index.js')
  })
  .forEach(function (file) {
    apis.push(require(path.join(__dirname, file)))
  })

module.exports = apis
