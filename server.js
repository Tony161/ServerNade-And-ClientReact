const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const serveIndex = require('serve-index');
const multer = require('multer');
md5 = require('js-md5');
var fs = require('fs');

var storage = multer.diskStorage({
  destination: 'images/',
  filename: (req, file, cb) => {
    var parts = file.originalname.split('.');
    var newName = md5(Math.random().toString(36).substring(2, 15)) + '.' + parts[parts.length - 1];
    cb(null, newName)
    var partsID = file.fieldname.split('-');
    var connection = connect();
    var query = `SELECT image from People where id='${partsID[partsID.length - 1]}'`;
    connection.query(query, (err, rows, fields) => {
      if (!err) {
        if (rows[0].image) {
          fs.unlinkSync(`./images/${rows[0].image}`);
        }
        const updateQuery = `UPDATE People SET image ='${newName}' WHERE id='${partsID[partsID.length - 1]}'`;
        connection.query(updateQuery, function (error, results, fields) {
          if (error) throw error;
          connection.end();
        });
      } else {
        console.log(err);
      }
    });
  }
})

const upload = multer({ storage: storage })
const route = '/images';
const path = '.' + route;

app.use(bodyParser.json());
app.use(cors());
app.use(route, serveIndex(path));
app.use(route, express.static(path));

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

app.post('/persons', function (req, res, next) {
  var connection = connect();
  var query = `INSERT into People (name,surname,company) values ('${
    req.body.name
    }', '${req.body.surname}', '${req.body.company}')`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.put('/persons/:id', (req, res) => {
  var connection = connect();
  var query = `UPDATE People SET name='${req.body.name}', surname='${
    req.body.surname
    }', company='${req.body.company}' WHERE id='${req.params.id}'`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.delete('/persons/:id', (req, res, next) => {
  var connection = connect();
  var query = `DELETE from People where id = '${req.params.id}'`;
  connection.query(query, function (error, results, fields) {
    if (error) throw error;
    select(connection, res);
  });
});

app.post('/upload-image', upload.any(), (req, res, next) => {
  res.send(req.files);
});

app.listen(3003, () => {
  console.log('Server is running');
});
