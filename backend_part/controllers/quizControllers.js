const asyncHandler = require("express-async-handler");
const { validateCreateQuiz, Quiz, validateUpdateQuiz } = require("../models/Quiz.js");

module.exports.createQuizCtrl = asyncHandler(async(req, res) => {
    const {error} = validateCreateQuiz(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }else {
        const quiz = new Quiz({
            title: req.body.title,
            questions: req.body.questions,
            user: req.user._id
        });
        await quiz.save();
        res.status(201).json({message: "Quiz has been created successfully", quiz})
    }
});

module.exports.getSingleQuizCtrl = asyncHandler(async(req, res) => {
    const quiz = await Quiz.findById(req.params.id).populate("user", ["-password"]);
    if(!quiz) {
        return res.status(404).json({message: "Quiz is not found"})
    }else {
        res.status(200).json(quiz)
    }
});

module.exports.getAllQuizzesCtrl = asyncHandler(async(req, res) => {
    const QUIZ_PER_PAGE = 3;
    const {pageNumber, category} = req.query;
    let quizzes;
    if(pageNumber) {
        quizzes = await Quiz.find().skip((pageNumber -1 ) * QUIZ_PER_PAGE).limit(QUIZ_PER_PAGE).sort({createdAt: -1}).populate("user", ["-password"])
    }else if(category) {
        quizzes = await Quiz.find({category}).sort({createdAt: -1}).populate("user", ["-password"])
    }else {
        quizzes = await Quiz.find().sort({createdAt: -1}).populate("user", ["-password"])
    }
    res.status(200).json({message: "All Quizzes", quizzes})
});

module.exports.updateQuizCtrl = asyncHandler(async(req, res) => {
    const {error} = validateUpdateQuiz(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }
    const quiz = await Quiz.findById(req.params.id);
    if(!quiz) {
        return res.status(404).json({message: "The Quiz is not found"})
    }
    const updateObject = {};
    if(req.body.title) {
        updateObject.title = req.body.title
    }
    if(req.body.questions) {
        updateObject.questions = req.body.questions
    }
    if(req.body.user) {
        updateObject.user = req.body.user
    }
    const updatedQuiz = await Quiz.findByIdAndUpdate(req.params.id, {$set: updateObject}, {new: true});
    res.status(200).json({message: "The quiz has been updated successfully", updatedQuiz})
});

module.exports.deleteQuizCtrl = asyncHandler(async(req, res) => {
    const quiz = await Quiz.findById(req.params.id);
    if(!quiz) {
        return res.status(404).json({message: "The quiz is not found"})
    }
    if(req.user.isAdmin || (quiz.user && req.user._id === quiz.user.toString())) {
        await Quiz.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "The quiz has been deleted successfully", quizId: quiz.id})
    }else {
        res.status(403).json({message: "Access denied, forbidden"})
    }
});

module.exports.getCountQuiz = asyncHandler(async (req, res) => {
    const count = await Quiz.countDocuments();
    if(!count) {
        return res.status(404).json({message: "There are not quizzes"})
    } else {
        res.status(200).json(count)
    }
})