const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose  = require('mongoose');
//const routes = require('./routes/api');
// connect to mongodb
mongoose.connect('mongodb://localhost/iir');
mongoose.Promise = global.Promise;

app.use(express.static('public'));

app.use(bodyParser.json());
// initialez routers
app.use('/api',require('./routes/api'));

// error handling middleware
app.use(function(err, req,res, next){
    // console.log(err);
    res.status(442).send({error : err.message});
});


// listen for request
app.listen(process.env.port || 5555, function(){
    console.log('server starts !!!!');
});