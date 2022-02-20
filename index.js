const express = require('express')
const app = express()
const admin_routes = require('./admin_router') // includes the routes.js file
const cors = require('cors') // includes cors module
const bodyParser= require('body-parser');
const mongoose = require('mongoose');

require('dotenv').config({path: '.env'})
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors()) // We're telling express to use CORS
app.use(express.json()) // we need to tell server to use json as well
app.use(admin_routes) // tells the server to use the routes in routes.js
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
    res.send('PAGE COMING SOON');
    });

app.listen(process.env.PORT, () => {
    console.log("The API is running...")
})