//This is the Db connection to mongoose and mongo servers. The .env file is the connection our own own specific mongoose account and database we are using

const mongoose = require('mongoose')

const connectDB = (url) => {
  return mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
}

module.exports = connectDB
