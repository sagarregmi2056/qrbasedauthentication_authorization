const express = require('express');
const app = express();
const ejs = require('ejs');
app.set('view engine','ejs')
app.set('views','./view');




const cors = require('cors');
const router = require('./router/user_router');


const connectdb = require('./db/db');
const bodyParser = require('body-parser');
const path = require('path');
connectdb();


app.use(express.json());



app.use(express.json());
app.use(cors()); 
app.use(router);

app.get('/', function (req, res) {

    // this code is to host 
  res.render("index");

//   here it is sending response 
})


app.listen(4000,function(){
    console.log("our server is running at port 4000");
}) 