var express = require('express');
var app = express();
var path = require('path');
var PORT = process.env.PORT || 8080;
var db = require('./db');
var MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017/searchHistory';
var searchHistory = require('./searchHistory/model');
var request = require('request');
var searches = require('./searches/model');

app.get('/', function(req, res) {
  var fileName = path.join(__dirname, 'index.html');
  res.sendFile(fileName, function (err) {
    if (err) {
      console.log(err);
      res.status(err.status).end();
    }
    else {
      console.log('Sent:', fileName);
    }
  });
});

app.get('/recent', function(req, res) {
    
    searchHistory.recent(function(err, docs){
        if(err){
            res.status(500).json(err);
        }
        res.json({search: docs});
    });
    
});

app.get('/search/:query/pagesize/:size', function(req, res){
    var query = req.params.query;
    var size = req.params.size;
    var time = Date.now();
    
    searches.insert({'date': time,
                    'query': query
    });
    
    var url = "https://api.gettyimages.com/v3/search/images/creative?phrase=" + 
            encodeURIComponent(query) +
            "&page_size=" +
            encodeURIComponent(size);
            
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
                    res.json(obj.images.map(createResults));
            }   
    
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