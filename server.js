const express =require('express');
const mysql = require('mysql');

const db = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'justforfun',
    database : 'nodemysql'
});

db.connect((err) => {
    if(err) throw err;
    console.log("MySQL is Connected...");
});


const app = express();

app.get('/createdb', (req,res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, row) => {
        if(err) throw err;
        console.log(row);
        res.send('Database created...');
    });
});

app.get('/createtable', (req,res) => {
    let sql = 'CREATE TABLE emp_table(id int AUTO_INCREMENT, emp_name VARCHAR(255), team VARCHAR(255), ship VARCHAR(255), PRIMARY KEY (id));';
    db.query(sql, (err, result) => {
        if(err){
            console.log('err', err);
        }else{
        console.log(result);
        }
        res.send('Table Created...');
    });
});




app.get('/insertdata', (req,res) => {
    let put = {
        id : 345,
        emp_name : 'Esakki',
        team : 'BE',
        ship : 'B'
    };

    let sql = 'INSERT into emp_table SET ?';
    let query = db.query(sql,put, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Inserted...');
    });
});


app.get('/insertdata', (req,res) => {
    let put = {
        id : 897,
        emp_name : 'Muthu',
        team : 'DEVOPS',
        ship : 'C'
    };

    let sql = 'INSERT into emp_table SET ?';
    let query = db.query(sql,put, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Inserted...');
    });
});


app.get('/insertdata', (req,res) => {
    let put = {
        id : 432,
        emp_name : 'Pranali',
        team : 'UI',
        ship : 'B'
    };

    let sql = 'INSERT into emp_table SET ?';
    let query = db.query(sql,put, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Inserted...');
    });
});



app.get('/getdata', (req,res) => {
    let sql = 'SELECT *  from emp_table';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Fetched...');
    });
});



app.get('/getdata/:id', (req,res) => {
    let sql = `SELECT *  from emp_table WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Fetched...');
    });
});


app.get('/putdata/:id', (req,res) => {
    let put = 'C';
    let sql = `UPDATE emp_table SET ship = '${put}' where id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Updated...');
    });
});

app.get('/deletedata/:id', (req,res) => {
    let sql = `DELETE FROM emp_table WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('Data Deleted...');
    });
});



app.listen('3306', () => {
    console.log("Server is listening on port 3306...");
});

