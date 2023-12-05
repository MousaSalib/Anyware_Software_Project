const { loginAdminCtrl } = require('../controllers/authControllers.js');
const {registerUserCtrl, loginUserCtrl} = require("../controllers/authControllers.js");
const router = require('express').Router();

router.route("/loginAdmin").post(loginAdminCtrl);
router.post("/register", registerUserCtrl);
router.post("/login", loginUserCtrl)

module.exports = router