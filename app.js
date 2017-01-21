var express = require('express');
var app = express();
var router = express.Router();
var PORT = process.env.PORT || 8080;
var db = require('./db');
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/searchHistory';
var searchHistory = require('./searchHistory/model');
var request = require('request');
var searches = require('./searches/model');
//var pug =require('pug');

//app.set('view engine', 'pug');

app.get('/', function(req, res){
        res.send("here I am");
});

app.get('/recent', function(req, res) {
    
    searchHistory.recent(function(err, docs){
        if(err){
            res.status(500).json(err);
        }
        res.json({search: docs});
    });
    
});

app.get('/search/:query',function(req, res){
    var query = req.params.query;
    var time = Date.now();
    
    searches.insert({'date': time,
                    'query': query
    });
    

    var url = "https://api.gettyimages.com/v3/search/images/creative?phrase=" + 
            encodeURIComponent(query);
            
    var apiKey = 'j878g39yx378pa77djthzzpn';
    
       request({
                url: url,
                method: 'GET',
                headers: { 
                    "Api-Key": apiKey
                }
                
            }, 
            function(error, response, data){
                if(error) {
                    console.log(error);
                } else {
                    var obj = JSON.parse(data);
                    console.log("result_count" +  obj.result_count );
                    res.json(obj.images.map(createResults));
            }   
    
        });
    
});

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
});

function createResults(image) {
  return {
    title: image.title,
    source: image.display_sizes[0].uri,
  };
}