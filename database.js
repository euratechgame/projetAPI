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



// const MongoClient = require('mongodb').MongoClient;
// const uri = "mongodb+srv://jeanlapinafpa:<password>@clusterprojetafpa-mvaec.gcp.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("test").collection("devices");
//   // perform actions on the collection object
//   client.close();
// });

const db = new Database();
db.connect();
module.exports = db;