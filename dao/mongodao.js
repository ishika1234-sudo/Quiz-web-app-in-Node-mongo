
exports.findOne = function findOne(model, query, callback){
    try{
        model.findOne(query, function(err, userObj){
            if(err){
                console.log('ERROR IN FINDONE', err)
                return callback(err);
            }else if (userObj){
                return callback(null,userObj);
            }else {
                return callback();
            }
        });
    }catch(error){
        console.log('CATCHED ERROR', error)
    }
}


exports.find = function find(model, query, callback){
    try{
        model.find(query, function(err, userObj){
            if(err){
                console.log('ERROR IN FIND', err)
                return callback(err);
            }else if (userObj){
                return callback(null,userObj);
            }else {
                return callback();
            }
        });
    }catch(error){
        console.log('CATCHED ERROR', error)
    }
}

exports.insertOne = (model, query) =>{
    try{
        var docToInsert = new model(query);
        docToInsert.save(function(err, userObj){
            if(err){
                console.log('ERROR IN INSERTONE', err)
                return callback(err);
            }else if (userObj){
                return callback(null,userObj);
            }else {
                return callback();
            }
        });
    }catch(error){
        console.log('CATCHED ERROR', error)
    }

}

exports.insertMany = (model, query) =>{
    try{
        model.insertMany(query, function(err, userObj){
            if(err){
                console.log('ERROR IN INSERTMANY', err)
                return callback(err);
            }else if (userObj){
                return callback(null,userObj);
            }else {
                return callback();
            }
        });
    }catch(error){
        console.log('CATCHED ERROR', error)
    }

}


exports.deleteOne = (model, query) =>{
    try{
        model.deleteOne(query, function(err, userObj){
            if(err){
                console.log('ERROR IN DELETEONE', err)
                return callback(err);
            }else if (userObj){
                return callback(null,userObj);
            }else {
                return callback();
            }
        });
    }catch(error){
        console.log('CATCHED ERROR', error)
    }

}