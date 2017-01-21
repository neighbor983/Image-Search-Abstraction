var express = require('express');
var router = express.Router();
var searches = require('./model');

var http = require('http');
var request = require('request');

router.get('/:query',function(req, res){
    var query = req.params.query;
    
    searches.insert({time: new Date.now(),
                    query: query
    });
    

    var url = "https://api.gettyimages.com/v3/search/images/creative?phrase=" + 
            encodeURIComponent(query);
            
    var apiKey = 'j878g39yx378pa77djthzzpn';
    
       request({
                url: url,
                method: 'GET',
                headers: { //We can define headers too
                    "Api-Key": apiKey
                }
                
            }, 
            function(error, response, body){
                if(error) {
                    console.log(error);
                } else {
                    console.log(response.statusCode, body);
            }   
    
        });

    
    
});