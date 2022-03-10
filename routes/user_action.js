const express = require('express')
const Question = require('../src/model/admin_model.js')
const UserQuizDetails = require('../src/model/user_quiz_details.js')
const router = express.Router()
const queries = require('../dao/mongodao')


//get the quiz questions for user
router.get('/newquiz', (req, res) => {
    try{
        console.log('req from url', req.query)
        queries.findOne(Question, {'QuestionGenre':req.query.category}, function(error, questionFound) {
            if(questionFound){
                console.log(questionFound);
                res.render('pages/get_ques_for_users',
                    {'user':req.query.user, 'Ques':questionFound});
            }else{
                res.send('error',error)
            }
            
        });
       
    }catch(error){
        console.log('catched error', error)
    }
})

//STORE THE USER'S QUIZ ANSWER IN DATABASE
router.post('/newquiz', (req, res) => {
    try{

    }catch(error){

    }
})


module.exports = router



