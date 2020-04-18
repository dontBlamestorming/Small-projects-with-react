// Get data
const fs = require('fs');

// Basic server set
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
console.log(conf); // check what database use

const mysql = require('mysql'); // have to 'npm install --save mysql'
const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

connection.connect(); // init connect with database

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER", (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
