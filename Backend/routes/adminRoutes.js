const express = require('express');
const authmiddleware = require('../middleware/authMiddleware');
const { getAllUserController, getAllPropertycontroller, getallbookingcontroller, handleStatusController } = require('../controller/adminController');

const router = express.Router();


router.get("/getallusers", authmiddleware, getAllUserController);
router.post("/handlestatus", authmiddleware, handleStatusController);
router.get("/getallproperties", authmiddleware, getAllPropertycontroller);
router.get("/getallbooking", authmiddleware, getallbookingcontroller);

module.exports = router;
