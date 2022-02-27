const User=require('../src/model/users');
const {auth} =require('./auth');
const express = require('express')
const router = express.Router();
const uuid = require("uuid");
console.log('AUTH',auth, User)

// get register user pagge
router.get('/api/register',function(req,res){
    res.render('user_register')
})

// get login user page
router.get('/api/login',function(req,res){
    res.render('user_login')
})

// adding new user (sign-up route)
router.post('/api/register',function(req,res){
    req.body['unique_id'] = req.body.firstname + uuid.v4();
    console.log('NEW USER IS',req.body )
    // taking a user
    const newuser=new User(req.body);
    console.log('newuser is',newuser,User)
    
   //if(newuser.password!=newuser.confirmPassword)
   if(newuser.password!=newuser.confirmpassword)
    {
        return res.status(400).json({message: "password not match"});
    }
    
    User.findOne({email:newuser.email},function(err,user){
        if(user) {
            return res.status(400).json({ auth : false, message :"email exits"});
        }
 
        newuser.save((err,doc)=>{
            console.log('here')
            if(err) {console.log(err);
                return res.status(400).json({ success : false});}
            // res.status(200).json({
            //     succes:true,
            //     user : doc
            // });
            res.redirect('/api/login'); 
        });
    });
 });

 // login user
router.post('/api/login', function(req,res){
    console.log('LOGGED IN USER IS', req.body)
    // console.log('request obect', req.cookies)
    // let token=req.cookies.auth;
    // User.findByToken(token,(err,user)=>{
    //     if(err) return  res(err);
    //     if(user) return res.status(400).json({
    //         error :true,
    //         message:"You are already logged in"
    //     });
    
        //else{
            User.findOne({'email':req.body.email},function(err,user){
                //console.log('user password', User)
                if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
                //console.log('userrr', user)
        
                // user.comparepassword(req.body.password,(err,isMatch)=>{
                //     console.log('password passed', req.body.password)
                //     if(!isMatch) return res.json({ isAuth : false,message : "password doesn't match"});
                callfun = user.comparepassword(req.body.password)
                console.log("callfun", callfun)
                if(callfun == true){
        
                    user.generateToken((err,user)=>{
                        if(err) return res.status(400).send(err);
                        // res.cookie('auth',user.token).json({
                        //     isAuth : true,
                        //     id : user._id
                        //     ,email : user.email
                        // });
                        res.redirect('/api/profile'); 
                    });    
                }
                else{
                    return res.json({ isAuth : false,message : "password doesn't match"});
                }
            });
          //});
        //}
    //});
});



// get logged in user prrofile
router.get('/api/profile',function(req,res){
    console.log('INSIDE PROFILE',req.user,res.locals.user ,
  )
    // res.json({
    //     isAuth: true,
    //     id: req.user._id,
    //     email: req.user.email,
    //     name: req.user.firstname + req.user.lastname
        
    // })
    res.render('user_profile');
});


//logout user
router.get('/api/logout',auth,function(req,res){
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        //res.sendStatus(200);
        res.redirect('/user_home_page')
    });

}); 


module.exports = router