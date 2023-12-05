const mongoose = require("mongoose");
const Joi = require("joi")

const QuizSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true
    },
    questions: [
        {
            text: {
                type: String,
                trim: true,
                required: true
            },
            options: [
                {
                    text: {
                        type: String,
                        required: true,
                        trim: true
                    },
                    isCorrect: {
                        type: Boolean,
                        required: true,
                        default: false
                    }
                }
            ]
        }

    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
        // required: true
    }
}, {timestamps: true});

const validateCreateQuiz = (obj) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        questions: Joi.array().items(
            Joi.object({
                text: Joi.string().trim().min(2).required(),
                options: Joi.array().items(
                    Joi.object({
                        text: Joi.string().trim().required(),
                        isCorrect: Joi.boolean().required()
                    })
                ).min(1).required()
            })
        ).min(1).required(),
        user: Joi.string().trim() 
    });
    return schema.validate(obj);
};

const validateUpdateQuiz = (obj) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        questions: Joi.array().items(
            Joi.object({
                text: Joi.string().trim().min(2),
                options: Joi.array().items(
                    Joi.object({
                        text: Joi.string().trim(),
                        isCorrect: Joi.boolean()
                    })
                ).min(1)
            })
        ).min(1),
        user: Joi.string().trim()
    });
    return schema.validate(obj);
};

const Quiz = mongoose.model("Quiz", QuizSchema);

module.exports = {
    Quiz,
    validateCreateQuiz,
    validateUpdateQuiz
}