const mongoose = require('mongoose');
 
//Attributes of the Question object
var questionschema = new mongoose.Schema({
Question: {
    type: String,
    required: 'This field is required!'
    },
Question_id: {
    type: String,
    required: 'This field is required!'
    },
QuestionGenre: {
    type: String,
    required: 'This field is required!'
    },
Options: {
    type: Object,
    required: 'This field is required!'
    },
Answer: {
    type: String,
    required: 'This field is required!'
    }
});
 
module.exports = mongoose.model('Questions', questionschema)