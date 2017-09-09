var express = require('express');
var router = express.Router();
const mongo = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/blog';
const dbhandle = require('../mongo.js');

/* GET home page. */
router.get('/', (req, res) => {
  res.sendfile("public/index.html");
});
 router.get('/post', (req, res) => {
  res.sendfile("public/para.html");
}); 
router.get('/getTags', (req, res) => {
  mongo.connect(DB_CONN_STR, (err, db) => {
    if(err) {throw err;}
    dbhandle.findData(db, (result) => {
      db.close();
      if(result.length == 0) {
        res.send(JSON.stringify({'0':'Not Found'}));
      }
      else {
        res.send(JSON.stringify(result));
      }
    }, {}, 'tags');
  })
})
router.get('/testtest', (req, res)=> {
  res.render('index', {"title":"Ajax Test", "user":"芝士君"});
})


module.exports = router;
