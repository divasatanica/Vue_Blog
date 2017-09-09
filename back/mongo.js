function insertData(db, callback, data, collections){
	let collection = db.collection(collections);
	collection.insert(data, function(err, result){
		if(err){
			console.log('Error:' + err);
			return;
		}
		callback(result);
	});
}

function findData(db, callback, wherestr, collections){
  let collection = db.collection(collections);
  let length;
  collection.count((err, count) => {
    if(err) {throw err;}
    else {
      length = count;
    }
  })
  setTimeout(() => {
    collection.find(wherestr).toArray(function(err, result){
      if(err){
        console.log('Error:' + err);
        return ;
      }
      callback(result);
    });
  }, 0);
}

function findDataWithOffset(db, callback, sortstr, collections, offset){
  let collection = db.collection(collections);
  let length;
  collection.count(function (err, count) {
    if(err) {throw err;}
    else {
      length = count;
    }
  })
  setTimeout(() => {
    collection.find().sort(sortstr).skip(offset).limit(5).toArray(function(err, result){
      if(err){
        console.log('Error:' + err);
        return ;
      }
      callback(result, length);
    });
  }, 0);
}

function updateData(db, callback, collections) {   
    let collection = db.collection(collections);
    let whereStr = {"name":'Coma'};
    let updateStr = {$set: { "message" : "i love you" }};
    collection.update(whereStr, updateStr, function(err, result) {
        if(err)
        {
            console.log('Error:'+ err);
            return;
        }     
        callback(result);
    });
}

function delData(db, callback, collections) {   
  let collection = db.collection(collections);
  let whereStr = {"name":'Coma'};
  collection.remove(whereStr, function(err, result) {
    if(err)
    {
      console.log('Error:'+ err);
      return;
    }     
    callback(result);
  });
}

module.exports.insertData = insertData;
module.exports.findData = findData;
module.exports.findDataWithOffset = findDataWithOffset;
module.exports.updateData = updateData;
module.exports.delData = delData;