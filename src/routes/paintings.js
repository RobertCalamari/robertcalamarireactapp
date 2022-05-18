var mysql = require('mysql');


var SOCKET_LIST = {};

function getSocketList(){
	return SOCKET_LIST;
}


var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);

connection.connect();

var connection = mysql.createConnection(process.env.JAWSDB_MARIA_URL);
var sql = "SELECT * FROM paintings";
var allpaintings = [];

connection.query(sql, function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    allpaintings = result;
});

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {

    res.json(allpaintings)
});

module.exports = router;