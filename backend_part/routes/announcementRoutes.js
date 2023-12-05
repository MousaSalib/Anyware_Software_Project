const { createAnnouncementCtrl, getSingleAnnouncementCrtl, getAllAnnouncementsCtrl, updateAnnouncementCtrl, deleteAnnouncementCtrl, getCountAnnouncementCtrl } = require("../controllers/announcementControllers.js");
const validateObjectId = require("../middleWares/validateObjectId.js");
const { verifyToken } = require("../middleWares/verifyToken.js");

const router = require("express").Router();
router.route("/").post(verifyToken, createAnnouncementCtrl).get(getAllAnnouncementsCtrl);
router.route("/count").get(getCountAnnouncementCtrl);  
router.route("/:id")
    .get(validateObjectId, getSingleAnnouncementCrtl)
    .put(validateObjectId, verifyToken, updateAnnouncementCtrl)
    .delete(validateObjectId, verifyToken, deleteAnnouncementCtrl);
   

module.exports = router