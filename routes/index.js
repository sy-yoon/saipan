var express = require('express');
var router = express.Router();

var mongo = require('mongodb'); 
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
 
var server = new Server('localhost', 27017, {auto_reconnect: true, 'native_parser':true});
var db = new Db('saipan', server);
 
db.open(function(err, db) {
    if(!err) {
        console.log("Connected to 'saipan' database");
        populateDB(db);
    }
});

var menus = [
              {
                  PARENT_ID : 'ROOT',
                  ID : '1',
                  NAME : '데이터표준',
                  HREF : '#std/std_area'
                  
              }/*,{
                  PARENT_ID : '1',
                  ID : '1_1',
                  NAME : '표준분류체계'
              },{
                  PARENT_ID : '1',
                  ID : '1_2',
                  NAME : '데이터표준조회'
              },{
                  PARENT_ID : '1_2',
                  ID : '1_2_1',
                  NAME : '단어'
              },{
                  PARENT_ID : '1_2',
                  ID : '1_2_2',
                  NAME : '도메인'
              },{
                  PARENT_ID : '1_2',
                  ID : '1_2_3',
                  NAME : '용어'
              },{
                  PARENT_ID : '1_2',
                  ID : '1_2_4',
                  NAME : '코드'
              }*/,{
                  PARENT_ID : 'ROOT',
                  ID : '2',
                  NAME : '데이터모델'
              },{
                  PARENT_ID : 'ROOT',
                  ID : '3',
                  NAME : '데이터베이스',
                  HREF : '#dbms/db_area'
              },{
                  PARENT_ID : 'ROOT',
                  ID : '4',
                  NAME : '시스템관리'
              },{
                  PARENT_ID : '4',
                  ID : '4_1',
                  NAME : '사용자관리'
              },{
                  PARENT_ID : '4',
                  ID : '4_2',
                  NAME : '메뉴관리'
              }  
            ];

var populateDB = function(db) {
    db.collection('menu', {safe:true}, function(err, collection) {
        //if (err) {
            collection.remove({});
            console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
            collection.insert(menus, {safe:true}, function(err, result) {
                if (err) {
                    console.log('An error has occurred');
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                }
            });
        //}
    });
}

/* GET home page. */
router.all('/', function(req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendfile('./public/index.html');
});

var clone = function(a) {
   return JSON.parse(a);
}

router.post('/jsondata.action', function(req, res, next){
    db.collection(req.query.collection, function(err, collection) {
        if(req.query.method == 'find'){
            var querySelector = {};
            if(req.query.condition != undefined)
                querySelector = clone(req.query.condition);
                
            collection.find(querySelector).toArray(function(err, items) {
                res.send({rows : items});
            });    
        }else if(req.query.method == 'find-range'){
            var querySelector = {};
            if(req.query.condition != undefined)
                querySelector = clone(req.query.condition);
                
            collection.find(querySelector).skip(req.query.pageSize*(req.query.pageNum-1)).limit(parseInt(req.query.pageSize)).toArray(function(err, items) {
                res.send({rows : items});
            });    
        } else if(req.query.method == 'insert'){
            collection.insert(clone(req.query.data) , function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                     res.send({success : true});
                }
            });
        } else if(req.query.method == 'update'){
            collection.updateMany(req.query.data,  function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send({success : true});
                }
            });
        } else if(req.query.method == 'remove'){
            collection.remove(req.query.data, function(err, result) {
                if (err) {
                    res.send({'error':'An error has occurred'});
                } else {
                    console.log('Success: ' + JSON.stringify(result[0]));
                    res.send(result[0]);
                }
            });
        } else if(req.query.method == 'count'){
            var querySelector = {};
            if(req.query.condition != undefined)
                querySelector = clone(req.query.condition);
                
            collection.count(querySelector, function(err, count) {
                res.send({'count': count});    
            });
            
        }
        
    });
});



module.exports = router;
