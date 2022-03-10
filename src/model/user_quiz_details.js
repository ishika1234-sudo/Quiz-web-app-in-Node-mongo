var mongoose=require('mongoose');


const userQuizDetailsSchema=mongoose.Schema({
    unique_id:{
        type: String,
        maxlength: 100
    },
    name:{
        type: String,
        required: true,
        maxlength: 100
    },
    Question_id:{
        type: String,
        required: 'This field is required!'
        
    },
    Question: {
        type: Object,
        required: 'This field is required!'
        },
    Correct_Answer: {
        type: String,
        required: 'This field is required!'
        },
    User_Answer: {
        type: String,
        required: 'This field is required!'
        }
});



module.exports=mongoose.model('userQuizDetails',userQuizDetailsSchema);