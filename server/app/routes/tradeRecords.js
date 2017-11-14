import asyncHandle from "../middleware/index"
import TradeRecord from "../models/TradeRecord"

const fs = require("fs")
const multer = require("multer")
const csv = require("csvtojson")
// const TradeRecordController = require("../controllers/tradeRecord")
const upload = multer({ dest: __dirname + "temp.store-csv" })
const express = require("express")

const router = express.Router()

router.get("/", asyncHandle(async (req, res, next) => {
    const records = await TradeRecord.getList()
    res.status(200).json(records)
  })
)

router.post("/",upload.single("csv"), asyncHandle(async (req, res, next) => {
    const csvFile = req.file
    const csvPath = csvFile.path
    const tradeIds = await TradeRecordController.getAllByField("tradeId")
    const headers = await TradeRecordController.getHeaders()

    let store = []
    let count = 0

    const readStream = await readCSV()
    const save = await TradeRecordController.saveAll(store)
    res.status(200).json(save)

    function readCSV() {
      return new Promise((resolve, reject) => {
        csv({ headers: headers })
          .fromFile(csvPath)
          .on("json", record => {
            if (tradeIds.indexOf(record.tradeId) === -1) {
              count++
              let tradeRecord = new TradeRecord(record)
              store.push(tradeRecord)
            }
          })
          .on("done", error => {
            if (count === store.length) {
              resolve()
            }
            reject(error)
          })
      })
    }
  })
)

export default router