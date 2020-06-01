// Basic server set
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended : true }));

// Get data
const fs = require('fs');
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

app.post('/checkEmail', (req, res) => {
    let sql = 'SELECT mem_email from Authentication';
    let typedEmail = req.body.typedEmail;

    db.query(sql, typedEmail,
        (err, result, fields) => {
            if(err) {
                throw err;
            } else {
                for( var i = 0; i < result.length; i++ ) {
                    if(typedEmail == result[i].mem_email) {
                        res.json({ isDuplicate : true });
                        res.end();
                        break;
                    } 
                }
            }
    });
});

app.post('/signIn/users', (req, res) => {
    let sql = 'SELECT mem_email, mem_password FROM Authentication';
    console.log(res.body);
    let email = req.body.userId;
    let password = req.body.password;
    let params = [email, password];

    db.query(sql, params,
        (err, result, fields) => {
            if(err) {
                res.send('누구세요?');
                throw err;
            } else if(email == result[0].mem_email && password == result[0].mem_password) {
                res.json({ redirectURL : "/confirmedUser" });
                console.log('환영합니다.');
                res.end();
            } 
        }
    );

});

app.post('/signUp/users', (req, res) => {
    const sql = 'INSERT INTO Authentication VALUES (null, ?, ?, ?, ?, ?, ?, ?, now(), 0)';
    const email = req.body.userId;
    const password = req.body.password;
    const nickname = req.body.nickname;
    const birthYear = req.body.birthYear;
    const birthMonth = req.body.birthMonth;
    const birthDay = req.body.birthDay;
    const gender = req.body.gender;
    const params = [email, password, nickname, birthYear, birthMonth, birthDay, gender];

    db.query(sql, params,
        (err, result, fields) => {
            if(err) {
                res.send('중복된 아이디입니다. 다른 아이디를 입력해주시 바랍니다.');
                throw err;
            } else if(result) {
                res.json({ redirectURL: "/confirmedUser" });
                res.end();
                console.log('회원가입을 축하드립니다.')
            } 
        }
    );
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});