const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/blog';
const dbhandle = require('../mongo');


router.post('/', (req, res) => {
  let param = req.body;
  let whereStr = {"name": param.name};
  if(req.cookies.name){
    mongo.connect(DB_CONN_STR, (err, db) => {
      dbhandle.findData(db, (result) => {
        result.forEach((rec) => {
          if(rec.name == req.cookies.name) {
            res.header("Access-Control-Allow-Credentials","true");
            res.send(JSON.stringify({username: req.cookies.name, message: 'Success'}));
          }
        })
      }, {}, "user")
    })
  }
  else if(!param.name) {
    res.send(JSON.stringify({message: 'Invalid Request'}));
  }
  else {
    let date = new Date();
    mongo.connect(DB_CONN_STR, (err, db) => {
      dbhandle.findData(db, (result) => {
        if(result[0].password !== param.password) {
          res.send(JSON.stringify({message: 'Wrong Password'}));
        }
        else {
          res.header("Access-Control-Allow-Credentials","true");
          res.cookie("name", param.name, {httpOnly: false, maxAge: 7*24*3600*1000, expires: new Date(date.getTime()+7*24*3600*1000)});
          res.sendStatus(JSON.stringify({username: param.name}));
        }
      }, whereStr, "user")
    });
  } 
});

module.exports = router;