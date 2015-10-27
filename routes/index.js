var express = require('express');
var router = express.Router();

var mongo = require('../modules/mongo.js');


/* GET home page. */
router.all('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendfile('./public/index.html');
});

var clone = function (a) {
    return JSON.parse(a);
}

router.post('/jsondata.action', function (req, res, next) {
    var db = mongo.getdb();
    db.collection(req.query.collection, function (err, collection) {
        var querySelector = {};
        if (req.query.method == 'find') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);
            
            var predicate = {};                    
            if (req.query.predicate != undefined)
                predicate = clone(req.query.predicate);
                
            collection.find(querySelector, predicate).toArray(function (err, items) {
                res.send({ 'rows': items });
            });
        } else if (req.query.method == 'find-one') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);

            collection.findOne(querySelector, function (err, doc) {
                res.send({ 'doc': doc });
            });
        } else if (req.query.method == 'find-range') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);

            collection.find(querySelector).skip(req.query.pageSize * (req.query.pageNum - 1)).limit(parseInt(req.query.pageSize)).toArray(function (err, items) {
                res.send({ 'rows': items });
            });
        } else if (req.query.method == 'insert') {
            collection.insert(clone(req.query.data), function (err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send({ success: true });
                }
            });
        } else if (req.query.method == 'update') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);


            collection.update(querySelector, clone(req.query.data), {upsert: true}, function (err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send({ success: true });
                }
            });
        } else if (req.query.method == 'remove') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);
                
            collection.remove(querySelector, function (err, result) {
                if (err) {
                    res.send({ 'error': 'An error has occurred' });
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        } else if (req.query.method == 'count') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);

            collection.count(querySelector, function (err, count) {
                res.send({ 'count': count });
            });
        }
    });
});

module.exports = router;
