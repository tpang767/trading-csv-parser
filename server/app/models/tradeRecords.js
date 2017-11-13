const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TradeRecordSchema = new Schema({
	tradeId: String,
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

TradeRecordSchema.statics.getHeaders = function getKeys() {
  return Object.keys(this.schema.obj)
}
TradeRecordSchema.statics.mostRecent = async function mostRecent(field = {}) {
  return await this.find(field).sort({createdAt: 'asc'}).limit(1)
}
TradeRecordSchema.statics.findNewerThan = async function findNewerThan(timestamp) {
  return await this.find({createdAt: {$gte: timestamp}})
}
TradeRecordSchema.statics.getAllByField = async function getAllByField(field) {
  return await this.distinct(field, {})
}

export default mongoose.model('TradeRecord', TradeRecordSchema)

  // if(isArray(include)) {
  //   include = options.include.reduce(a,b => {
  //     if (include in a) {
  //       a[b]++;
  //     }
  //     else {
  //       a[b] = 1;
  //     }    
  //       return a
  //   },{})
  // } 

//   var isArray = (function () {
//     // Use compiler's own isArray when available
//     if (Array.isArray) {
//         return Array.isArray;
//     } 
 
//     // Retain references to variables for performance
//     // optimization
//     var objectToStringFn = Object.prototype.toString,
//         arrayToStringResult = objectToStringFn.call([]); 
 
//     return function (subject) {
//         return objectToStringFn.call(subject) === arrayToStringResult;
//     };
// }());

// function toParamObj(arr, cb) {
//     return arr.reduce(a,b => {
//       a[b] = 1
//     },{})
// }
// function isObject(val) {
//   return !!val || typeof val === 'object'
// }