// import TradeRecord from "../models/TradeRecord"

// exports.getAll = async (field = {}) => {
//   const options = { _id: 0, __v: 0 }
//   const records = await TradeRecord.find(field)
//   const recordsOutput = await records.map(record => {
//     return record.toJSONFor(record)
//   })
//   const totals = await TradeRecord.getTotals()
//   const stats = Object.assign(output, totals)
//   console.log(totals)
//   return stats
// }

// exports.saveAll = async docs => {
//   return await TradeRecord.insertMany(docs)
// }

// exports.getLatest = async () => {
//   return await TradeRecord.find({}, "createdAt")
//     .sort({ createdAt: "asc" })
//     .limit(1)
// }

// exports.create = async obj => {
//   return new TradeRecord(obj)
// }

// exports.getHeaders = async () => {
//   return await TradeRecord.getHeaders()
// }

// exports.getAllByField = async field => {
//   return await TradeRecord.getAllByField(field)
// }
