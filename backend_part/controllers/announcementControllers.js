const asyncHandler = require("express-async-handler");
const { validateCreateAnnouncement, Announcement, validateUpdateAnnouncement } = require("../models/Announcement.js");

module.exports.createAnnouncementCtrl = asyncHandler(async (req, res) => {
    const {error} = validateCreateAnnouncement(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }else {
        const announcement = await Announcement.create({
            title: req.body.title,
            content: req.body.content,
            category: req.body.category,
            user: req.user._id
        })
        res.status(201).json({message: "Announcement has been created successfully", announcement})
    }
});

module.exports.getSingleAnnouncementCrtl = asyncHandler(async(req, res) => {
    const announcement = await Announcement.findById(req.params.id).populate("user", ["-password"]);
    if(!announcement) {
        return res.status(404).json({message: "Announcement is not found"})
    }else {
        res.status(200).json(announcement)
    }
});

module.exports.getAllAnnouncementsCtrl = asyncHandler(async(req, res) => {
    const ANNOUNCEMENT_PER_PAGE = 3;
    const {pageNumber, category} = req.query;
    let announcements;
    if(pageNumber) {
        announcements = await Announcement.find().skip((pageNumber -1 ) * ANNOUNCEMENT_PER_PAGE).limit(ANNOUNCEMENT_PER_PAGE).sort({createdAt: -1}).populate("user", ["-password"])
    } else if(category) {
        announcements = await Announcement.find({category}).sort({createdAt: -1}).populate("user", ["-password"]) 
    } else {
        announcements = await Announcement.find().sort({createdAt: -1}).populate("user", ["-password"])
    }
    res.status(200).json({message: "All announcement", announcements})
});

module.exports.updateAnnouncementCtrl = asyncHandler(async(req, res) => {
    const {error} = validateUpdateAnnouncement(req.body);
    if(error) {
        return res.status(400).json({message: error.details[0].message})
    }
    const announcement = await Announcement.findById(req.params.id);
    if(!announcement) {
        return res.status(404).json("Announcement is not found")
    }
    if(req.user._id !== announcement.user.toString()) {
        return res.status(403).json({message: "Access denied, You are not allowed"})
    }
    const updatedAnnouncement = await Announcement.findByIdAndUpdate(req.params.id, {
        $set: {
            title: req.body.title,
            content: req.body.content,
            category: req.body.category
        }
    }, {new: true}).populate("user", ['-password'])
    res.status(200).json(updatedAnnouncement)
});

module.exports.deleteAnnouncementCtrl = asyncHandler(async(req, res) => {
    const announcement = await Announcement.findById(req.params.id);
    if(!announcement) {
        return res.status(404).json({message: "Announcement is not found"})
    }
    if(req.user.isAdmin || (announcement.user && req.user._id === announcement.user.toString())) {
        await Announcement.findByIdAndDelete(req.params.id);
        res.status(200).json({message: "Announcement has been deleted successfully", announcementId: announcement.id})
    } else {
        res.status(403).json({message: "Access denied, forbidden"})
    }
});

module.exports.getCountAnnouncementCtrl = asyncHandler(async(req, res) => {
    const count = await Announcement.countDocuments();
    if(!count) {
        return res.status(404).json({message: "No announcements found"})
    } else {
        res.status(200).json(count)
    }
})