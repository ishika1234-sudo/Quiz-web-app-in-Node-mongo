const express = require('express')
const app = express()
const admin_routes = require('./admin_router') // includes the routes.js file
const auth_routes = require('./auth/auth_route.js') 
const cors = require('cors') // includes cors module
const bodyParser= require('body-parser');
const cookieParser=require('cookie-parser');
const mongoose = require('mongoose');

require('dotenv').config({path: '.env'})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(admin_routes) // tells the server to use the routes in routes.js
app.use(auth_routes) 
app.set('views', __dirname + '/views/pages');
app.set('view engine', 'ejs');




mongoose.connect('mongodb://localhost:27017/quizzDB', {useNewUrlParser: true}, (err) => {
if (!err) {
console.log('Successfully Established Connection with MongoDB')
}
else {
console.log('Failed to Establish Connection with MongoDB with Error: '+ err)
}
})


//Create a welcome message and direct them to the main page
app.get('/', (req, res) => {
    res.render('user_home_page')
    });
app.get('*', function(req, res,next){
    console.log('----------',req.user)
    res.locals.user = req.user || null;
    next();
})
app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})