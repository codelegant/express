var mongodb = require("mongodb");
var assert = require("assert");
var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/express";
var insertDocuments = function (db, callback) {
    var collection = db.collection("user");
    collection.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ]).then(function (result) {
        assert.equal(3, result.result.n);
        assert.equal(3, result.ops.length);
        console.log("Inserted 3 documents into the document coollection");
        callback(result);
    });
    collection.updateOne({ "name": "lai" }, { "name": "lai" }, { upsert: true, w: 1 }, function (err, result) {
        assert.equal(null, err);
        assert.equal(1, result.rseult.n);
    });
};
mongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, function () {
        db.close();
    });
});
