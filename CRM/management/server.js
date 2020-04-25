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

const multer = require('multer');
const upload = multer({dest : './upload'}); // for setting when user upload file to here

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER", (err, rows, fields) => {
            res.send(rows);
        }
    )
});

app.use('/image', express.static('./upload'));  // image 루트로 접근할때 upload 폴더와 매핑

app.post('/api/customers', upload.single('image'), (req,res) => {
    let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
});
