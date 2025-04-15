const mongoose = require('mongoose');
require('dotenv').config()

function connectDb(){
  mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('Connected to db'));
}

module.exports = connectDb