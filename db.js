const mongoose = require('mongoose')
const dotenv = require('dotenv')

const basedir= __dirname;
const pathName = basedir+"\\env\\config.env" 
dotenv.config({ path: pathName })
const connectionString = process.env.DB_CONNECTION
console.log({connectionString, pathName})
const connectDB = () => {
  try {
    mongoose.connect(connectionString, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    })
    console.log('Connected to Database') // outputs green text
  }
  catch {
    console.log('Failed to connect to Database') // outputs green text
  }
}



module.exports={
    connectDB, connectionString, basedir
}

