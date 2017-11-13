import TradeRecord from "../models/tradeRecords";

exports.getAll = async () => {
  return await TradeRecord.find({}, { _id: 0, __v: 0 });
}

exports.saveAll = async (docs) => {
  return await TradeRecord.insertMany(docs);
}

exports.getLatest = async () => {
  return await TradeRecord.find({}, "createdAt")
    .sort({ createdAt: "asc" })
    .limit(1);
}

exports.create = async (obj) => {
  return new TradeRecord(obj);
}

exports.getHeaders = async () => {
  return await TradeRecord.getHeaders();
}

exports.getAllByField = async (field) => {
  return await TradeRecord.getAllByField(field);
}
