const mongoose = require('mongoose');
const config = require('../config');
const { mongoURI } = require('../config');

 const connectdb=()=>{ mongoose.connect(mongoURI,{
    useNewUrlparser:true,
    useUnifiedTopology:true,

 })
  .then(() => console.log('Connected to mongodb restronepal'))
  .catch((err)=>console.log(err))
}
module.exports = connectdb;