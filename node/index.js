var http = require('http');
var nodeStatic = require('node-static');
var file = new nodeStatic.Server('./..');

//postgres
const {Client} = require('pg');
const connectionString = 'postgresql://cloud_user:1349@localhost:5432/cloud';

const client = new Client({
    connectionString: connectionString
});
client.connect();



function accept(req, res) {
    if (req.url === '/getInfo') {
        // console.log('getInfoServer');
        client.query('SELECT * FROM usage', (err, resDB) => {
            // console.log(resDB.rows[0].datatime)
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