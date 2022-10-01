const express = require('express');
const app = express();
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const HOST = process.env.HOST;
const PORT = process.env.PORT;
const PASS = process.env.PASS;
const DATABASE = process.env.DATABASE;

const db = mysql.createPool({
    host: HOST,
    user: 'newuser',
    password: PASS,
    database: DATABASE
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));
 
app.post("/api/insert", async (req, res)=>{
    try {
    const issueName = req.body.issueName;
    const issueDesc = req.body.issueDesc;
    const sqlInsert = "INSERT INTO issues (issueName, issueDesc) VALUES (?, ?)";
    db.query(sqlInsert, [issueName, issueDesc]);
    res.status(200).json('successful');
    } catch (err) {
        res.json(err);
    }
    
});

app.put("/api/update/:id", async (req, res) =>{
    try {
    const issueName = req.body.issueName;
    const issueDesc = req.body.issueDesc
    const id = req.params.id;
    const sqlUpdate = 'UPDATE issues SET issueName = ?,issueDesc = ? WHERE id = ?';
    db.query(sqlUpdate, [issueName, issueDesc, id]);
    res.status(200).json(sqlUpdate);
    } catch (err) {
        res.json(err);
    }
    
});

app.get("/api/get", async (req, res)=>{
    try {
        const sqlSelect = "SELECT * FROM issues";
        db.query(sqlSelect, (err, result)=>{
            res.status(200).json(result);
        });
       
    } catch (err) {
        res.json(err);
    }
    
});

app.delete("/api/delete/:id", async (req, res)=>{
    try {
    const id = req.params.id;
    const sqlDelete=
    `DELETE FROM issues WHERE id = "${id}"`;
    db.query(sqlDelete, id);
    res.status(200).json('item deleted');
    } catch (err) {
        res.json(err);
    }
   
});



app.listen(PORT, ()=> {
    console.log('connected to server');
});