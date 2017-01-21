var express = require('express');
var router = express.Router();
var searchHistory = require('./model');


router.get('/', function(req, res) {
    
    searchHistory.recent(function(err, docs){
        if(err){
            res.status(500).json(err);
        }
        res.render('recent', {search: docs});
    });
    
});

module.exports = router;