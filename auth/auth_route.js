const User=require('../src/model/users');
const {auth} =require('./auth');
const express = require('express')
const router = express.Router();
const uuid = require("uuid");

// get register user pagge
router.get('/api/register',function(req,res){
    try{
        res.render('pages/user_register')
    }catch(error) {
        console.error('ERROR', error);
    }
})

// get login user page
router.get('/api/login',function(req,res){
    try{
        res.render('pages/user_login')
    }catch(error) {
        console.error('ERROR', error);
    }
})

// adding new user (sign-up route)
router.post('/api/register',function(req,res){
    try{
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
                res.redirect('/api/login'); 
            });
        });
    }
    catch(error) {
        console.error('ERROR', error);
    }
 });

 // login user
router.post('/api/login', function(req,res){
    try{
        console.log('LOGGED IN USER IS', req.body)
        User.findOne({'email':req.body.email},function(err,user){
            //console.log('user password', User)
            if(!user) return res.json({isAuth : false, message : ' Auth failed ,email not found'});
            callfun = user.comparepassword(req.body.password)
            if(callfun == true){

                user.generateToken((err,user)=>{
                    if(err) return res.status(400).send(err);
                    console.log('user det',user.email, user.unique_id )
                    res.redirect('/api/profile/?user=' + user.unique_id); 
                });    
            }
            else{
                return res.json({ isAuth : false,message : "password doesn't match"});
            }
        });
    }
    catch(error) {
        console.error('ERROR', error);
    }
});



// get logged in user prrofile
router.get('/api/profile',function(req,res){
    try{
        console.log('session', req.query.user)
        var current_user = req.query.user
        if(current_user){
            User.findOne({'unique_id':current_user},function(err,user){
                var loggedin_user  = user.firstname + " " + user.lastname
                res.render('pages/user_profile', {'user':loggedin_user, 'user_unique_id':current_user});
            })
        }
        else{
            res.render('pages/user_profile')
        }
    }
    catch(error) {
        console.error('ERROR', error);
    }
        
});


//logout user
router.get('/api/logout',auth,function(req,res){
    try{
        console.log('logout')
        req.user.deleteToken(req.token,(err,user)=>{
            if(err) return res.status(400).send(err);
            //res.sendStatus(200);
            res.redirect('/user_home_page')
        });
    }catch(error) {
        console.error('ERROR', error);
    }   

}); 


module.exports = router