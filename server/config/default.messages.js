const chalk = require('chalk')
const log = console.log

const dbConnected = () => log(chalk.green("Mongoose default connection open"))

const dbError = (err) => log(chalk.red("Mongoose default connection error: " + err))

const dbDisconnected = () =>  log(chalk.yellow("Mongoose default connection disconnected"))

const dbTerminated = () => log(chalk.yellow("Mongoose default connection disconnected through app termination"))


const serverStart = (err) => () => {
    if(err) log(chalk.red.bgWhite('Server Start Error: ' + err))
    log(chalk.green.bgWhite(`Server successfully started....listening on PORT:${port}`))
}

module.exports = {
  dbConnected,
  dbError,
  dbDisconnected,
  dbTerminated,
  serverStart
}
