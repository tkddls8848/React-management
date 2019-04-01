const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json');
const config = JSON.parse(data);
const mysql = require('mysql');
const db = mysql.createConnection({
  host:config.host,
  user:config.user,
  password:config.password,
  port:config.port,
  database:config.database
});
db.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/customers', (req, res)=>{
  db.query(
    "SELECT * FROM CUSTOMER", (err, results, fields) => {
      res.send(results);
    }
  );
});

app.listen(port, ()=>{
    console.log(`hello world ${port}`);
});