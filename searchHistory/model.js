var db = require('../db');
var collectionName = 'searchHistory';

exports.recent = function(cb) {
    var collection = db.get().collection(collectionName);
    var returnLimit = 10;

    collection
        .find()
        .sort({'date': -1})
        .limit(returnLimit)
        .toArray(function(err, docs) {
            cb(err, docs);
    });
};