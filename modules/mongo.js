var mongo = require('mongodb');
var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;
    
var db = undefined;
mongo.init = function(){
    var server = new Server('localhost', 27017, { auto_reconnect: true, 'native_parser': true });
    db = new Db('saipan', server);
    
    db.open(function (err, db) {
        if (!err) {
            console.log("Connected to 'saipan' database");
            //populateDB(db);
        }
    });

}

mongo.getdb = function(){
  return db;
}


var menus = [
    {
        parentId: 'ROOT',
        id: '1',
        name: '데이터표준',
        href: '#pages/std/stdarea'

    }, {
        parentId: 'ROOT',
        id: '2',
        name: '데이터모델'
    }, {
        parentId: 'ROOT',
        id: '3',
        name: '데이터베이스',
        href: '#pages/dbms/dbarea'
    }, {
        parentId: 'ROOT',
        id: '4',
        name: '시스템관리'
    }, {
        parentId: '4',
        id: '4_1',
        name: '사용자관리'
    }, {
        parentId: '4',
        id: '4_2',
        name: '메뉴관리'
    }, {
        parentId: '4',
        id: '4_3',
        name: '화면',
        href: '#mpage/PAGE'
    }, {
        parentId: '4',
        id: '4_4',
        name: '화면관리',
        href: '#pages/meta/pagemgr'
    }, {
        parentId: '4',
        id: '4_5',
        name: '서버프로시저관리',
        href: '#pages/meta/svrprodmgr'
    }
];


var dbms_object = [
    {
        dbmsType: '0001', /*Oracle*/
        objects: [
            'Tables',
            'Constraints',
            'Indexes',
            'Procedures'
        ]
    }, {
        dbmsType: '0002', /*Mssql*/
        objects: [
            'Tables',
            'Constraints',
            'Indexes'
        ]
    }
]

var server_procedures = [
    {
        PROC_id: ''
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
                            href: '#dbms/table?dbmsid={{item.DBMS_id}}&schemaid={{item.SCHEMA_id}}&indexNm={{item.MBR_OBJ_NM}}',
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

    /*db.collection('page_meta', { safe: true }, function (err, collection) {
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
    });*/
}


module.exports = mongo;