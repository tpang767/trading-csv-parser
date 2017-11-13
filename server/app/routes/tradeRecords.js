import asyncHandle from "../middleware/index"
const fs = require("fs")
const multer = require("multer")
const csv = require("csvtojson")
const TradeRecords = require("../models/tradeRecords")
const upload = multer({ dest: __dirname + "temp.store-csv" })
const express = require("express")

const router = express.Router()

router.get("/traderecords", asyncHandle(async (req, res, next) => {
    const records = await TradeRecord.getAll()
    res.status(200).json(records)
  })
)

router.post("/traderecords",upload.single("csv"), asyncHandle(async (req, res, next) => {
    const csvFile = req.file
    const csvPath = csvFile.path
    const tradeIds = await TradeRecord.getAllByField("tradeId")
    const headers = await TradeRecord.getHeaders()

    let store = []
    let count = 0

    const readStream = await readCSV()
    const save = await TradeRecord.saveAll(store)
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

module.exports = router