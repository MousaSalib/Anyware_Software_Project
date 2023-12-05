const { createQuizCtrl, getSingleQuizCtrl, getAllQuizzesCtrl, updateQuizCtrl, deleteQuizCtrl, getCountQuiz } = require("../controllers/quizControllers.js");
const validateObjectId = require("../middleWares/validateObjectId.js");
const { verifyToken } = require("../middleWares/verifyToken.js");

const router = require("express").Router();

router.route("/").post(verifyToken,createQuizCtrl).get(getAllQuizzesCtrl);
router.route("/count").get(getCountQuiz)
router.route("/:id").get(validateObjectId, getSingleQuizCtrl)
    .put(validateObjectId, verifyToken, updateQuizCtrl).delete(validateObjectId, verifyToken, deleteQuizCtrl)



module.exports = router