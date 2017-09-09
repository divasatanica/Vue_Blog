const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;
const DB_CONN_STR = 'mongodb://localhost:27017/blog';
const dbhandle = require('../mongo.js');
const objectid = require('objectid');
const path = require('path');
const mark = require('marked');
const multi = require('multiparty');
const fs = require('fs');

router.post('/new', function(req, res, next) {
	let data = req.body;
	let dbObject = {
		"header":'',
		"paras":[],
		"timeStamp":'',
		"marked": "",
		"clock":""
	};
	let date = new Date(); 
	if(!data.header){
		return false;
	}
	dbObject.header = data.header;
	dbObject.marked = mark(data.passage2mark);
	dbObject.clock = data.clock; 
	dbObject.tag = JSON.parse(data.tags);
	dbObject.timeStamp = String(date.getFullYear())  + '0' + String(date.getMonth() + 1) + (date.getDate()>9?'':'0') + String(date.getDate()) + ((req.body.count >= 10) ? '0' + String(req.body.count) : '00' + String(req.body.count));
	mongo.connect(DB_CONN_STR, function(err, db){
		saveTags(dbObject.tag);
		dbhandle.insertData(db, function(result){
			db.close();
			res.header("Access-Control-Allow-Credentials","true");
			res.send(JSON.stringify({"message":"文章已发布！"}));
		}, dbObject, 'article');
	});
	function saveTags(tags) {
		mongo.connect(DB_CONN_STR, (err, db) => {
			for(let i in tags) {
				dbhandle.findData(db, (result)=>{
					if(result.length == 0) {
						dbhandle.insertData(db, (result)=>{
							
						}, {tag: tags[i]}, 'tags');
					}
				}, {tag: tags[i]}, 'tags');
			}
		})
	}
});

router.post('/filtering', (req, res) => {
	const param = req.body;
	const _startDate = param.startDate;
	const _endDate = param.endDate;
	const _tag = param.tag;
	const _page = param.page;
	let where = {};
	if(((!_startDate || !_endDate) && !_tag) || !_page) {
		res.status(400).send(JSON.stringify({"0": "check your request"}));
		return;
	}
	if(_startDate && _endDate && _tag) {
		where = {"timeStamp": {$gte: _startDate, $lte: _endDate}, "tag": _tag}
	}
	else if(_startDate && _endDate) {
		where = {"timeStamp": {$gte: _startDate, $lte: _endDate}};
	}
	else if (_tag) {
		where = {"tag": _tag}; //匹配数组内多项则为{"tag": {$all: [tag1, tag2]}}
	}
	mongo.connect(DB_CONN_STR, (err, db) => {
		dbhandle.findDataWithOffset(db, (result) => {
			if(result.length == 0) {
				res.send({"code": 0, "message": "Not found"});
				return;
			}
			let response = {};
			response.article = [];
			for(let i in result) {
				response.article.push(result[i]);
			}
			response.length = result.length;
			response.code = 1;
			res.send(response);
			db.close();
		}, where, 'article', _page-1);
	});
});

router.get('/display/:id', function(req, res){
	const where = {"_id":objectid(req.params.id)}; 
	mongo.connect(DB_CONN_STR, function(err, db){
		dbhandle.findData(db, function(result){
			if(result.length == 0){
				res.status(404).send(JSON.stringify({"0":"Not found!"}));
				return ;
			}
			let response = {};
			result = result[0];
			for(let i in result){
				response[i] = result[i];
			}
			res.send(JSON.stringify(response));
			db.close();
		}, where, 'article');
	});
});

router.get('/newest/:offset', function(req, res, next){
	let sortstr = {"timeStamp":-1};
	let offsetNo = Number(req.params.offset) * 5;
	mongo.connect(DB_CONN_STR, function(err, db){
		dbhandle.findDataWithOffset(db, function(result, length){
			if(result.length == 0){
				res.send(JSON.stringify({"code": 0, "message":"Not found!"}));
				return ;
			}
			let response = {};
			response.article = [];
			for(let i in result){
				response.article.push(result[i]);
			}
			response.length = result.length;
			response.code = 1;
			res.send(response);
			db.close();
		}, sortstr, 'article', offsetNo);
	});
});

module.exports = router;