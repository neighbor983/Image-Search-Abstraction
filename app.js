var express = require('express');
var app = express();
var router = express.Router();
var PORT = process.env.PORT || 8080;
var db = require('./db');
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/searchHistory';
var searchHistory = require('./searchHistory/controller');

router.use('/recent', searchHistory);

app.listen(PORT, function(req,res){
   console.log('app listening on port: ' + PORT);
});

db.connect(MONGO_URL, function(err) {
    if (err) {
        console.log('Unable to connect to Mongo.');
        process.exit(1);
    } else {
        app.listen(3000, function() {
        console.log('Listening on port 3000...');
    });
  }
})