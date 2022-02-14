// Import mysql, express, bodyParser    - First Layer

const mysql = require('mysql');                           
const express = require('express');
const bodyParser = require('body-parser');

// Configuration             -Second Layer

const app = express();
app.use(bodyParser.json());   //---> data of body in json format

// Database Connection Starts from here

const kong = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: '',
    port: '3306',
    database: 'commerce'
})

// Connection of Database with Server

kong.connect(function(err){
    if(err){
        console.log(err.message);
    }
    else{
        console.log("My database server is connected");
    }
});


// API Creation
// CRUD Operation

app.get("/contact", (req, res)=>{
    res.send('This is a Contact Page')
})

app.get("/About", (req, res)=>{
    res.send('This is a About Page')
})

// CRUD Operation Start

app.post('/api/user/product/', function(req, res){
    var userData = {
        ID: req.body.ID,
        Name: req.body.Name,
        Salary: req.body.Salary,
        City: req.body.City
    };
    
    let sqlQuery = "INSERT INTO USER SET ?";
    let query = kong.query(sqlQuery, userData, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "response": result}));
    });
});

app.get('/api/user/all_data/', function(req, res){
   
    let sqlQuery = "SELECT * FROM user";
    let query = kong.query(sqlQuery, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "response": result}));
    });
})


app.put('/api/user/update/:ID', (req, res)=>{
       
    let sql = "update user set Name='" + req.body.Name+"', City='" +req.body.City+"' WHERE ID=" +req.params.ID;
    let query = kong.query(sql, (err, result)=>{
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "error":null, "response": result}));
    });
})


app.delete('/api/user/delete-data/:ID', (req, res)=>{
        
    let sqlQuery = "DELETE FROM USER WHERE ID= " +req.params.ID;
    let query = kong.query(sqlQuery, function(err, result){
        if(err) throw err;
        res.send(JSON.stringify({"status":200, "response": result}));
    });
})




// Server Start 

app.listen(21000, ()=> {
    console.log("Server running....");
});
