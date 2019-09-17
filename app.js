const express = require('express'),
    app = express();
os = require('os');
const bodyParser = require('body-parser');
const cors = require('cors');
const routerUser = require('./routerUser');
const routerEtape = require('./routerEtape.js')
const routerParcours = require('./routerParcours.js')

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1', routerUser);
app.use('/api/v1', routerEtape);
app.use('/api/v1', routerParcours);

const port = (process.env.PORT || '3000');

let server = app.listen(port, os.hostname(), () => {
    let host = server.address().address,
        port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
});