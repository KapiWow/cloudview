var http = require('http');
var nodeStatic = require('node-static');
url = require("url");
qs = require("querystring");
var file = new nodeStatic.Server('./..');

//postgres
const {Client} = require('pg');
const connectionString = 'postgresql://cloud_user:1349@localhost:5432/cloud';

const client = new Client({
    connectionString: connectionString
});
client.connect();

function accept(req, res) {
    var query = url.parse(req.url).query,
        params = qs.parse(query);
    var type = req.url.split('?')[0];
    if (type === '/getCurrentUsage') {
        // console.log('getInfoServer');
        client.query('SELECT * FROM usage WHERE machineID = ' + params.machineID, (err, resDB) => {
            res.end(JSON.stringify(resDB.rows[0]));
            // console.log(typeof resDB.rows[0].datatime);
            // console.log(typeof resDB.rows[0].cpu);
            // console.log(typeof Client);
        })
    } else if (type === '/getMachineInfo') {
        // console.log('getInfoServer');
        client.query('SELECT * FROM allInfo2 WHERE machineID = ' + params.machineID, (err, resDB) => {
            res.end(JSON.stringify(resDB.rows[0]));
        // console.log(typeof resDB.rows[0].datatime);
        // console.log(typeof resDB.rows[0].cpu);
        // console.log(typeof Client);
    })
    } else {
        file.serve(req, res);
    }
}

//create server 
http.createServer(accept).listen(8080);

console.log('Server running on port 8080');