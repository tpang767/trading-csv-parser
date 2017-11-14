/* eslint no-console: 0 */
const path = require("path")
const express = require("express")
const webpack = require("webpack")
const webpackMiddleware = require("webpack-dev-middleware")
const webpackHotMiddleware = require("webpack-hot-middleware")
const config = require("./webpack.config.js")
const mongoose = require("mongoose")
const cookieParser = require("cookie-parser")
const bodyParser = require("body-parser")
const cors = require("cors")
const methodOverride = require("method-override")
const messages = require("./config/default.messages")
const morgan = require("morgan")

const isDeveloping = process.env.NODE_ENV !== "production"
const port = isDeveloping ? 3000 : process.env.PORT
const app = express()
const dotenv = require("dotenv").config()
import Router from "./app/routes/tradeRecords"

// console.log(process.env_DB_ACCESS)
mongoose.Promise = global.Promise
mongoose.connect(process.env.DB_ACCESS, { useMongoClient: true })
mongoose.connection.on("connected", messages.dbConnected)
mongoose.connection.on("error", messages.dbError)
mongoose.connection.on("disconnected", messages.dbDisconnected)
process.on("SIGINT", () => {
  mongoose.connection.close(() => { 
        console.log('Mongoose default connection disconnected through app termination')
        process.exit(0); 
})
})

if (isDeveloping) {
  const options = {
    publicPath: config.output.publicPath,
    contentBase: "src",
    stats: {
      colors: true,
      hash: false,
      timings: true,
      chunks: false,
      chunkModules: false,
      modules: false
    }
  }
  const compiler = webpack(config)
  const middleware = webpackMiddleware(compiler, options)
  app.use(middleware)
  app.use(webpackHotMiddleware(compiler))
}

app.use(cors())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(bodyParser.json({ limit: "52428800" }))
app.use(bodyParser.urlencoded({ limit: "52428800", extended: false }))

app.use(express.static(__dirname + "/dist"))
app.use("/traderecords", Router)

app.listen(port, "0.0.0.0", function(err) {
  if (err) {
    console.log(err)
  }
  console.info(
    "==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.",
    port,
    port
  )
})
