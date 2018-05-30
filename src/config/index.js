/**
 * Created by yangyue on 2018/4/12.
 */
const env = process.env.NODE_ENV || 'development'
const config = require('./config')[env]
module.exports = {
  ...config,
  logger: require('./logger')
}
