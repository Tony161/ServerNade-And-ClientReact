var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');
var cors = require('cors');
var app = express();

app.use(bodyParser.json());
app.use(cors());

var connect = () => {
  var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12#$qwER',
    database: 'Zadanie',
  });
  connection.connect();
  return connection;
};

var select = (connection, res) => {
  connection.query('SELECT * from People', (err, rows, fields) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
    }
    connection.end();
  });
};

app.get('/persons', (req, res) => {
	var connection = connect();
  select(connection, res);
});

app.post('/persons', function(req, res, next) {
  var connection = connect();
  var query = `INSERT into People (name,surname,company) values ('${
    req.body.name
  }', '${req.body.surname}', '${req.body.company}')`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.put('/persons/:id', (req, res) => {
  var connection = connect();
  var query = `UPDATE People SET name='${req.body.name}', surname='${
    req.body.surname
  }', company='${req.body.company}' WHERE id='${req.params.id}'`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.delete('/persons/:id', function(req, res, next) {
  var connection = connect();
  var query = `DELETE from People where id = '${req.params.id}'`;
  connection.query(query, function(error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.listen(3003, () => {
  console.log('Server is running');
});
