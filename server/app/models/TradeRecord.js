const mongoose = require("mongoose")
const Schema = mongoose.Schema
const moment = require('moment')
const format = require('format-number')

const TradeRecordSchema = new Schema({
  tradeId: Number,
  product: String,
  orderType: String,
  createdAt: Date,
  size: Number,
  sizeUnit: String,
  price: Number,
  fee: Number,
  total: Number,
  currency: String
})


const responseFormat = {
    'data': {
      'stats': {},
      'records': []
    }
}

function addToObject(arr) {
  arr.re
}
function addStats(init, stat) {

}
function setStats(stats) {
  return stats.reduce((init, stat) => {

  })
}
// function recordFormat(format) {
//   this.response = 
//   this.response = () => 
// }
const responseRecord = (record) => {
  return {
    'date': moment(record.createdAt).format('MM/DD/YY'),
    'tradeId': record.tradeId,
    'product': record.product,
    'orderType': record.orderType,
    'time': moment(record.createdAt).format('h:mm:ss a'),
    'currency': record.currency,
    'size': record.size,
    'unit': record.sizeUnit,
    'price': record.price,
    'fee': twoDecimals(record.fee),
    'totalNet': twoDecimals(record.total)
  }
}
function createQuery() {

}
const queries = {
  totalAverages: {
        'FEES': { $avg: "$fee" },
        'SIZE': { $avg: "$size" },
        'PRICE': { $avg: "$price" },
        'TOTALNET': { $avg: "$total"}
  },
  totalSums: {
      'FEES': { $sum: "$fee" },
      'TOTALNET': { $sum: "$total"}
  },
  totalCount: {

  }
}

TradeRecordSchema.statics = {
  list: 
}


TradeRecordSchema.statics.getAggregateStats = async function () {
  const average = await this.totalAverages()
  const sum = await this.totalSums()
  const count = await this.totalCount()
  
  return {
    'DATA': {
      'COUNT': count,
      'AVERAGE': average,
      'SUM': sum
    }
  }
}

TradeRecordSchema.statics.totalAverages = async function () {
  const query =  buildQuery(queries.totalAverages)
  const averages = await this.aggregate(query)
  return averages[0]
}

TradeRecordSchema.statics.totalCount = async function () {
  const query =  {$count: "TOTALRECORDS"}
  const count = await this.aggregate(query)
  return count[0]
}

TradeRecordSchema.statics.totalSums = async function () {
  const query = buildQuery(queries.totalSums)
  const sums = await this.aggregate(query)
  return sums[0]
}

TradeRecordSchema.statics.getList = async function (field = {}) {
  const results = await this.find(field)
  const records = await results.map(record => {
    return record.toJSONFor(record)
  })
  const stats = await this.getAggregateStats()

  Object.assign(stats['DATA'],{'RECORDS': records})
  return stats
}

TradeRecordSchema.statics.getHeaders = function getKeys() {
  return Object.keys(this.schema.obj)
}

TradeRecordSchema.statics.mostRecent = async function (field = {}) {
  return await this.find(field)
    .sort({ createdAt: "asc" })
    .limit(1)
}

TradeRecordSchema.statics.findNewerThan = async function (timestamp) {
  return await this.find({ 
    createdAt: { $gte: timestamp } 
  })
}

TradeRecordSchema.statics.getAllByField = async function (field) {
  return await this.distinct(field, {})
}


TradeRecordSchema.methods.toJSONFor = (record) => {
  return recordFormat(record)
}

function buildQuery(query, accumulator = '$group') {
  const queryCommand = {
    [accumulator]: {}
  }
  Object.assign(queryCommand[accumulator], {_id: null}, query)
  return queryCommand
}

function twoDecimals(num) {
  return Math.round(num * 100)/100
}

function setOperator(operator) {
  switch(operator.toUpperCase()) {
    case 'AVG' || 'AVERAGE':
      return '$avg'
      break;
    case 'SUM' || 'SUMTOTAL':
      return '$sum'
      break;
    case 'MAX' || 'HIGHEST':
      return '$max'
      break;
    case 'MIN' || 'LOWEST':
      return '$min'
      break;
    default:
      return false
  }
}
// const recordFormat = {
//     'DATE': '',
//     'TRADEID': null,
//     'PRODUCT': '',
//     'ORDERTYPE': '',
//     'TIME': '',
//     'CURRENCY': '',
//     'SIZE': null,
//     'UNIT': '',
//     'PRICE': null,
//     'FEE': null,
//     'TOTALNET': null 
// }

// TradeRecordSchema.statics.getTotal = async function (operator, fields) {
//   const accumulator = setOperator(operator)
//   const query = fields.reduce((queryObj, field) => {
//     let include = `total_${field}`
//     let temp = {
//       [accumulator]: `$${field.toLowerCase()}`
//     }

//     queryObj['$group'][include] = temp

//     return queryObj
//   },
//   {
//       $group : {
//         _id : null
//       }
//   })
  // const query =  {
  //     $group : {
  //       _id : null,
  //       'totalFees': { [accumulator]: "$fee" },
  //       'Total': {[accumulator]: "$total"}
  //     }
  // }

export default mongoose.model("TradeRecord", TradeRecordSchema)