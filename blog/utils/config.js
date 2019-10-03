require('dotenv').config()

let PORT = process.env.PORT
let DB_URL = process.env.DB_URL
let TEST_DB_URL = process.env.TEST_DB_URL

module.exports = {
  DB_URL,
  TEST_DB_URL,
  PORT
}