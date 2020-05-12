// Basic server set
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

// Get data
const fs = require('fs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
console.log(conf); // check what database use

const mysql = require('mysql'); // have to 'npm install --save mysql'
const db = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    port : conf.port,
    database : conf.database
});

db.connect(); // init connect with database

app.post('/auth/users', (req, res) => {
    // let sql = 'INSERT INTO Authentication VALUES (null, ?, ?, ?, now(), 0)';
    let email = req.body.userId;
    let password = req.body.password;
    let params = [email, password];

    db.query('SELECT mem_email, mem_password FROM Authentication', (err, result) => {
        if(err) { throw err }
        if(email == result[0].mem_email && password == result[0].mem_password) {
            res.redirect('/');
        } else {
            res.send('Who are you?');
        }
    });

    // db.query(sql, params,
    //     (err, rows, fields) => {
    //         if () {
    //             res.send(rows)
    //         }
            
    //     }
    // );

res.send(authInfo);
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});