const mongoose = require('mongoose');
const Joi = require("joi");

const AnnouncementSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        required: true,
        minlength: 2,
        maxlength: 200
    },
    content: {
        type: String,
        trim: true,
        required: true,
        minlength: 10
    },
    category: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        // required: true
    }
}, {timestamps: true});

const Announcement = mongoose.model("Announcement", AnnouncementSchema);

const validateCreateAnnouncement = (obj) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200).required(),
        content: Joi.string().trim().min(10).required(),
        category: Joi.string().required()

    })
    return schema.validate(obj)
};

const validateUpdateAnnouncement = (obj) => {
    const schema = Joi.object({
        title: Joi.string().trim().min(2).max(200),
        content: Joi.string().trim().min(10),
        category: Joi.string()
    })
    return schema.validate(obj)
}

module.exports = {
    Announcement,
    validateCreateAnnouncement,
    validateUpdateAnnouncement
}