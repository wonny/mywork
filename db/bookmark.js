var mongo = require('mongoskin');

var db = mongo.db('mongodb://wonny:wodnjs98@linus.mongohq.com:10053/wonny');
var BSON = mongo.BSONPure;

exports.findById = function(req, res) {
    var id = req.params.id;
    console.log('Retrieving : ' + id);
    db.collection('wonny', function(err, collection) {
        collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
            res.send(item);
        });
    });
};

exports.findAll = function(req, res) {
    db.collection('wonny', function(err, collection) {
        collection.find().toArray(function(err, items) {
            res.send(items);
        });
    });
};

exports.addBookmark = function(req, res) {
    var data = req.body;
    console.log('Adding data: ' + JSON.stringify(data));
    db.collection('wonny', function(err, collection) {
        collection.insert(data, {safe:true}, function(err, result) {
            if (err) {
                res.send({'error':'An error has occurred'});
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

exports.updateWine = function(req, res) {
    var id = req.params.id;
    var data = req.body;
    console.log('Updating data: ' + id);
    console.log(JSON.stringify(data));
    db.collection('wonny', function(err, collection) {
        collection.update({'_id':new BSON.ObjectID(id)}, data, {safe:true}, function(err, result) {
            if (err) {
                console.log('Error updating data: ' + err);
                res.send({'error':'An error has occurred'});
            } else {
                console.log('' + result + ' document(s) updated');
                res.send(data);
            }
        });
    });
}

