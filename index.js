const express = require('express');
var app = express();
const bodyparser = require('body-parser');
const mysql = require('mysql');

app.use(bodyparser.urlencoded({
    extended : true
}));

app.use(bodyparser.json());

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : 'justforfun',
    database : 'nodemysql'
});


connection.connect(function(err){
    if (err) throw err;
    console.log("Connected....!!");
})

app.get("/getdata", (req, res) => {
    let sql = "SELECT * FROM `emp_table`";
    let query = connection.query(sql, (err,rows) => {
        if(err) throw err;
        console.log(rows);
        res.send(rows);
    });
});


app.post('/putdata', (req, res) => {
    let data = {
        id: req.body.id,
        emp_name: req.body.emp_name
    };

    let sql = "INSERT INTO emp_table SET ?";
    let query = connection.query(sql, data, (err, result) => {
        if (err) throw err;
        res.send(JSON.stringify({
            "status" : 200,
            "error" : null,
            "response" : result
        }));
    });
});

app.put('/update', (req, res) => {
    let sql = "UPDATE emp_table SET emp_name = '" + req.body.emp_name + "',team='" +  req.body.team + "', ship='" +  req.body.ship + "' WHERE id =" + [req.body.id];
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

app.delete('/delete', (req, res) => {
    let sql = "DELETE FROM emp_table WHERE id=" + req.params.id;
    let query = connection.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});


app.listen(3306,() => {
    console.log("Server is listening at port 3306...");
})
