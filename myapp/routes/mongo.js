var mongodb = require("mongodb");
var assert = require("assert");
var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/express";
var insertDocuments = (db, callback) => {
    var collection = db.collection("user");
    var date=new Date();
    collection.updateOne({"name": "lai","signup_time": date }, { "name": "lai","signup_time": date}, { upsert: true, w: 1 }, (err, result) => {
        assert.equal(null, err);
        assert.equal(1, result.result.n);
    });
    collection.findOne({name:"lai"},function(err,item){
        assert.equal(null,err);
        assert.equal("lai",item.name);
        callback();
    })
};
mongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, () => {
        db.close();
    });
});
