const express = require('express')
const Question = require('./src/model/admin_model.js')
const router = express.Router()


// Page to create new quiz
router.get('/questions', (req, res) => {
    res.render('pages/admin_create_questions');
})

//Router to retrieve the complete list of available quiz quuestions
router.get('/list', (req,res) => {
    getAllQuizList(req, res)
       });


// create one new quiz question
router.post('/questions', (req, res) => {
    if (req.body){
        insertIntoMongoDB(req, res);
    }
    else {
        console.log('ERROR');
        }
})

// get details of the quiz to update 
router.get('/update/:question_id', (req, res) => {
    if(req.params.question_id){
        getQuizDetailToUpdate(req, res)
    }
    else {
        console.log('ERROR');
        }
})

//update one quiz question
router.post('/update', (req, res) => {
    if (req.body){
        updateIntoMongoDB(req, res);}
    else {
        console.log('ERROR');
        }
})

// delete one quiz question
router.get('/delete/:Question_id', (req, res) => {
    if(req.params.Question_id){
        deleteFromMongoDB(req, res)
    }
    else {
        console.log('ERROR');
        }
})

//--------------------------------------------------------FUNCTIONS-----------------------------------------------------

// fucntion to get the details of quiz to update
function getQuizDetailToUpdate(req, res){
    try{
        Question.find({'Question_id':req.params.question_id}, (err, doc) => {
            if (!err) 
                {
                    res.render('pages/admin_update_ques', {quizzes:doc});
                }
            else 
                { console.log('Failed to get Questions Details: ' + err); }
                });
    }
    catch (error) {
        console.error('ERROR', error);
        
    }
}

//function to retrieve the complete list of available quiz quuestions
function getAllQuizList(req, res){
    try{
        Question.find({}, (err, doc) => {
            if (!err) 
                {  
                    res.render('pages/admin_get_all_quiz', {quizzes:doc});
                }
            else 
                { console.log('Failed to fetch Details: ' + err); }
                });
    }
    catch (error) {
        console.error('ERROR', error);
        
    }
}

//Creating function to insert data into MongoDB
function insertIntoMongoDB(req,res) {
    try{
        var question = new Question();
        var options_object = {}
        console.log('question', question)
        var option1 = req.body.option1
        var option2 = req.body.option2
        var option3 = req.body.option3
        var option4 = req.body.option4
        options_object = {
            'option1':option1,
            'option2':option2,
            'option3':option3,
            'option4':option4
        }
        question.Question = req.body.question;
        question.Question_id = req.body.Question_id;
        question.QuestionGenre = req.body.QuestionGenre;
        question.Options = options_object;
        question.Answer = req.body.Answer
        console.log('question', question)
        question.save((err, doc) => {
        if (!err){
            //alert('Succcess')
            console.log(req.body)
            res.redirect('/questions');
            }
        else{
            console.log('Error during record insertion : ' + err);}
        });
    }
    catch (error) {
        console.error('ERROR', error);
        
    }
    }
    

//Creating a function to update data in MongoDB
function updateIntoMongoDB(req, res) {
    try{
        update_object={
            'Question':req.body.question,
            'Question_id':req.body.Question_id,
            'QuestionGenre':req.body.QuestionGenre,
            'Options':{
                'option1':req.body.option1,
                'option2':req.body.option2,
                'option3':req.body.option3,
                'option4':req.body.option4
            },
            'Answer': req.body.Answer,
            
        }
        Question.findOneAndUpdate({ Question_id: req.body.old_Question_id }, update_object, { new: true }, (err, doc) => {
        if (!err) 
        { 
            res.redirect('/questions'); 
        }
        else
        {
            console.log('Error during updating the record: ' + err);
        }
        });
    }catch (error) {
        console.error('ERROR', error)  
    }
    }

//Creating a function to deete data from MongoDB
function deleteFromMongoDB(req, res){
    try {
        Question.findOneAndDelete({'Question_id':req.params.Question_id}, (err, doc) => {
            if (!err) 
                {
                    res.redirect('/questions')
                }
            else 
                { console.log('Failed to Delete quizz Details: ' + err); }
                });
    } catch (error) {
        console.error('ERROR', error);
        
    }
}


module.exports = router