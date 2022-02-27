var mongoose=require('mongoose');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const { config } = require('dotenv');
const confiq=require('../../config/config').get(process.env.NODE_ENV);
console.log(confiq)
const salt=10;

const userSchema=mongoose.Schema({
    unique_id:{
        type: String,
        maxlength: 100
    },
    firstname:{
        type: String,
        required: true,
        maxlength: 100
    },
    lastname:{
        type: String,
        required: true,
        maxlength: 100
    },
    email:{
        type: String,
        required: true,
        trim: true,
        unique: 1
    },
    password:{
        type:String,
        required: true,
        minlength:8
    },
    confirmpassword:{
        type:String,
        required: true,
        minlength:8

    },
    token:{
        type: String
    }
});

userSchema.pre('save',function(next){
    var user=this;
    
    if(user.isModified('password')){
        // bcrypt.genSalt(salt,function(err,salt){
        //     if(err)return next(err);

        //     bcrypt.hash(user.password,salt,function(err,hash){
        //         if(err) return next(err);
        //         user.password=hash;
        //         user.confirmpassword=hash;
        //         next();
        //     })

        ///})
        return next();
    }
    else{
        next();
    }
});
     

userSchema.methods.comparepassword=function(password){
    let isMatch = "";
    console.log('compare', this.password,password)
    // bcrypt.compare(password,this.password.hash,function(err,isMatch, next){
    //     if(err) return cb(next);
    //     cb(null,isMatch);
    // });
    if (password == this.password){
        isMatch = true
        return isMatch
        
    }
    else{
        isMatch = false
        return isMatch
    }
}


// generate token

userSchema.methods.generateToken=function(cb){
    var user =this;
    var token=jwt.sign(user._id.toHexString(),confiq.SECRET);
    console.log('tokenn', token)

    user.token=token;
    user.save(function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}


// find by token
userSchema.statics.findByToken=function(token,cb){
    var user=this;
    console.log('loggged in user is', user)

    jwt.verify(token,confiq.SECRET,function(err,decode){
        user.findOne({"_id": decode, "token":token},function(err,user){
            if(err) return cb(err);
            cb(null,user);
        })
    })
};

//delete token

userSchema.methods.deleteToken=function(token,cb){
    var user=this;

    user.update({$unset : {token :1}},function(err,user){
        if(err) return cb(err);
        cb(null,user);
    })
}


module.exports=mongoose.model('User',userSchema);
