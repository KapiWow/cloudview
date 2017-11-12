var http = require('http');
var static = require('node-static');
// var pg = require('pg');
var file = new static.Server('./..');
//postgres
const { Client } = require('pg')
const connectionString = 'postgresql://cloud_user:1349@localhost:5432/cloud'

const client = new Client({
    connectionString: connectionString,
})
client.connect()

client.query('SELECT * FROM usage', (err, res) => {
    console.log(res.rows[0].datatime)
    client.end()
})

// function accept(req, res) {
// if (req.url = '/vote') {

// } else {
// 	file.serve(req, res);
// }
// }

//create server 
http.createServer(function(req, res) {
	file.serve(req, res);
}).listen(8080);

console.log('Server running on port 8080');