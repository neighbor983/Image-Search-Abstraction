var express = require('express');
var router = express.Router();
var searches = require('./model');

router.get('/:query',function(req, res){
    var query = req.params.query;
    
    searches.insert({time: new Date.now(),
                    query: query
    });
    
    //Todo api call for json
    
    
});