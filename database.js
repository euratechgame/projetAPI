const mongo = require('mongodb').MongoClient;

class Database {
    constructor() {
        this.client = null;
    }
    connect() {
        mongo.connect(process.env.URL_DATABASE, { useNewUrlParser: true }, (err, client) => {
            if (err) throw err
            this.client = client;
        });
    }
}



const db = new Database();
db.connect();
module.exports = db;