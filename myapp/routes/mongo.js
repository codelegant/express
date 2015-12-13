var mongodb = require("mongodb");
var assert = require("assert");
var mongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/express";
var insertDocuments = function (db, callback) {
    var collection = db.collection("user");
    collection.updateOne({ "name": "lai" }, { "name": "lai" }, { upsert: true, w: 1 }, function (err, result) {
        assert.equal(null, err);
        assert.equal(1, result.result.n);
    });
};
mongoClient.connect(url, function (err, db) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    insertDocuments(db, function () {
        db.close();
    });
});
