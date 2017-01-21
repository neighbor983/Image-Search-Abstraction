var express = require('express');
var router = express.Router();
var collectionName = 'searchHistory';

var db = require('../db');

router.get('/recent', function(req, res) {
    var collection = db.get().collection(collectionName);
    var returnLimit = 10;

    collection
        .find()
        .sort({'date': -1})
        .limit(returnLimit)
        .toArray(function(err, docs) {
            res.render('comments', {comments: docs});
        });
});

module.exports = router;