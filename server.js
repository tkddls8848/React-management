const express = require('express');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json');
const config = JSON.parse(data);
const multer = require('multer');
const upload = multer({dest : './upload'});
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

app.use('/image', express.static('./upload'));

app.post('/api/customers', upload.single('image'), (req,res) => {
  let sql = 'INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?, NOW(), 0)';
  let image = './image/' + req.file.filename;
  let userName = req.body.userName;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, userName, birthday, gender, job];
  db.query(sql, params,
    (err, rows, fields) => {
      res.send(rows);
      console.log(err);
    })
});

app.get('/api/customers', (req, res)=>{
  db.query(
    "SELECT * FROM CUSTOMER WHERE isDeleted = 0", (err, results, fields) => {
      res.send(results);
    }
  );
});

app.delete('/api/customers/:id', (req, res)=>{
  let SQL = "UPDATE CUSTOMER SET isDeleted = 1 WHERE id = ?";
  let params = [req.params.id];
  db.query(
    SQL, params , (err, results, fields) => {
      res.send(results);
    }
  );
});

app.listen(port, ()=>{
    console.log(`hello world ${port}`);
});