const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  let headers = req.headers;
  let obj =  {'title': 'Coma'};
  /*if(!headers['content-type']){
    res.render('test', obj);
  }
  else if(headers['content-type'] == 'application/json'){
    res.send(JSON.stringify(obj));
  }*/
  console.log(req.xhr);
});

module.exports = router;