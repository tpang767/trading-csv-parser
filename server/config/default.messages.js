const chalk = require('chalk')
const log = console.log

const dbConnected = () => log(chalk.green("Mongoose default connection open"))

const dbError = (err) => log(chalk.red("Mongoose default connection error: " + err))

const dbDisconnected = () =>  log(chalk.yellow("Mongoose default connection disconnected"))

const dbTerminated = () => mongoose.connection.close(() => {
  log(chalk.yellow("Mongoose default connection disconnected through app termination"))
  process.exit(0)
})

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
