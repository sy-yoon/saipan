var express = require('express');
var router = express.Router();

var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true, 'native_parser': true });
var db = new Db('saipan', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'saipan' database");
        populateDB(db);
    }
});

var menus = [
    {
        PARENT_ID: 'ROOT',
        ID: '1',
        NAME: '데이터표준',
        HREF: '#pages/std/std_area'

    }, {
        PARENT_ID: 'ROOT',
        ID: '2',
        NAME: '데이터모델'
    }, {
        PARENT_ID: 'ROOT',
        ID: '3',
        NAME: '데이터베이스',
        HREF: '#pages/dbms/db_area'
    }, {
        PARENT_ID: 'ROOT',
        ID: '4',
        NAME: '시스템관리'
    }, {
        PARENT_ID: '4',
        ID: '4_1',
        NAME: '사용자관리'
    }, {
        PARENT_ID: '4',
        ID: '4_2',
        NAME: '메뉴관리'
    }, {
        PARENT_ID: '4',
        ID: '4_3',
        NAME: '화면',
        HREF: '#mpage/PAGE'
    }, {
        PARENT_ID: '5',
        ID: '4_3',
        NAME: '화면관리',
        HREF: '#pages/meta/pagemgr'
    }
];


var dbms_object = [
    {
        DBMS_TYPE: '0001', /*Oracle*/
        OBJECTS: [
            'Tables',
            'Constraints',
            'Indexes',
            'Procedures'
        ]
    }, {
        DBMS_TYPE: '0002', /*Mssql*/
        OBJECTS: [
            'Tables',
            'Constraints',
            'Indexes'
        ]
    }
]

var server_procedures = [
    {
        PROC_ID: ''
    }
]

var page_meta = [
    {
        pageId: '1',
        pageNm: '',
        pageDesc:'',
        datasources: [
            {
                id: '1',
                name: 'procedure-count',
                method: 'count',
                collection: 'procedure',
                selector: {},
                fields: '*'
            }
        ],

        objects: {
            'procTbl': {
                type: 'TABLE',
                properties: {
                    id: 'procTbl',
                    header: [
                        {
                            field: 'MBR_OBJ_NM',
                            label: 'Procedure',
                            href: '#dbms/table?dbmsId={{item.DBMS_ID}}&schemaId={{item.SCHEMA_ID}}&indexNm={{item.MBR_OBJ_NM}}',
                        }, {
                            field: 'OBJ_NM',
                            label: 'Owner'
                        }, {
                            field: 'OBJECT_TYPE',
                            label: 'Type'
                        }
                    ],
                    usePagine: true,
                    datasource: '1'
                }
            }
        }
    }
]

var populateDB = function (db) {
    db.collection('menu', { safe: true }, function (err, collection) {
        //if (err) {
        collection.remove({});
        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
        collection.insert(menus, { safe: true }, function (err, result) {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
            }
        });
        //}
    });

    db.collection('dbms_object', { safe: true }, function (err, collection) {
        //if (err) {
        collection.remove({});
        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
        collection.insert(dbms_object, { safe: true }, function (err, result) {
            if (err) {
                console.log('An error has occurred');
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
            }
        });
        //}
    });

    db.collection('page_meta', { safe: true }, function (err, collection) {
        //if (err) {
        collection.remove({});
        console.log("The 'wines' collection doesn't exist. Creating it with sample data...");
        collection.insert(page_meta, { safe: true }, function (err, result) {
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
router.all('/', function (req, res, next) {
    //res.render('index', { title: 'Express' });
    res.sendfile('./public/index.html');
});

var clone = function (a) {
    return JSON.parse(a);
}

router.post('/jsondata.action', function (req, res, next) {
    db.collection(req.query.collection, function (err, collection) {
        var querySelector = {};
        if (req.query.method == 'find') {
            if (req.query.selector != undefined)
                querySelector = clone(req.query.selector);

            collection.find(querySelector).toArray(function (err, items) {
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
            collection.remove(req.query.data, function (err, result) {
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
