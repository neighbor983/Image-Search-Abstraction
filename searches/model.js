var db = require('../db');
var collectionName = 'searchHistory';

exports.insert = function(query, cb) {
    var collection = db.get().collection(collectionName);
    var time = Date.now();

    collection
        .insert({
                date: time,
                search: query
        });
        
};