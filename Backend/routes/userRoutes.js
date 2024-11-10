const express = require("express");


const authMiddlware = require("../middleware/authMiddleware");
const {
    registercontroller,
    logincontroller,
    forgetpasswordcontroller,
    authcontroller,
    getallpropertycontroller,
    getallbookingcontroller,
    bookingHandlecontroller,
} = require("../controller/userController");

const router = express.Router();

router.post("/register", registercontroller);
router.post("/login", logincontroller);
router.post("/forgotpassword", forgetpasswordcontroller);
router.post("/getuserdata", authMiddlware, authcontroller);
router.get("/getAllProperties", getallpropertycontroller);
router.post("/bookinghandle/:propertyid", authMiddlware, bookingHandlecontroller);
router.get("/getallbookings", authMiddlware, getallbookingcontroller);

module.exports = router;
