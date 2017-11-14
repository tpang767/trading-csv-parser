import axios from 'axios'

const baseURL = "http://localhost:3000"

function promiseWrap(fn) {
  return function() {
    return new Promise( (resolve, reject) => {
      try {
       fn().then(data => {
          resolve(data)
        })
      } catch (err) {
        reject(err)
      }
    })
  }
}

export const getRecords = promiseWrap(() => {
  return axios.get(`${baseURL}/traderecords`)
})

