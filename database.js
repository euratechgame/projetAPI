const mongo = require('mongodb').MongoClient;

class Database {
    constructor() {
        this.client = null;
    }
    connect() {
        mongo.connect(`mongodb+srv://jeanlapinafpa:afpaProjet@clusterprojetafpa-mvaec.gcp.mongodb.net/test?retryWrites=true`, { useNewUrlParser: true }, (err, client) => {
            if (err) throw err
            this.client = client;
        });
    }
}



const db = new Database();
db.connect();
module.exports = db;