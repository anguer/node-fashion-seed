/**
 * Created by yangyue on 2018/4/12.
 */
const Server = require('node-fashion')
const fs = require('fs')
const path = require('path')
const bodyParser = require('body-parser')
const config = require('./config')

/**
 * make a log directory, just in case it isn't there.
 */
try {
  fs.mkdirSync('./logs')
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e)
    process.exit(1)
  }
}

/**
 * Initialise log4js first, so we don't miss any log messages
 */
const log4js = require('log4js')
log4js.configure(config.logger)

const logger = log4js.getLogger('Server')

// create server
const server = new Server({
  port: config.port,
  debugger: config.debugger,
  logger
})

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({extended: false}))
server.static(path.join(__dirname, 'public'))

// set headers
server.use(function (req, res, next) {
  const origin = req.headers.origin
  if (typeof origin === 'undefined') {
    // No Cross Origin redirect
    res.header('Access-Control-Allow-Origin', '*')
  } else if (
    (origin.indexOf('http://localhost')) === 0 ||
    (origin.indexOf('http://172.16.') === 0) ||
    (origin.indexOf('http://192.168.1.') === 0)
  ) {
    res.header('Access-Control-Allow-Origin', origin)
    res.header('Access-Control-Allow-Credentials', 'true')
  } else {
    res.header('Access-Control-Allow-Origin', 'http://localhost')
  }
  res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Accept-Encoding, X-Access-Token')

  next()
})

server.handle(require('./api'))

server.start()
