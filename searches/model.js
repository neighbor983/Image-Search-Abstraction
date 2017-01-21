var db = require('../db');
var collectionName = 'searchHistory';

exports.insert = function(query, cb) {
    var collection = db.get().collection(collectionName);

    collection
        .insert({
                date: new Date.now(),
                search: query
        });
        
};