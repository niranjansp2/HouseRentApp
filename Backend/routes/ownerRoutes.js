const express = require("express");
const multer = require("multer");

const authMiddlware = require("../middleware/authMiddleware");

const {
  addPropertyController,getAllOwnerPropertiesController,getAllBookingsController,
  deletePropertyController,updatePropertyController,handleAllBookingstatusController
} = require("../controller/ownerContoller");

const router = express.Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post(
  "/postproperty",
  upload.array("propertyImages"),
  authMiddlware,
  addPropertyController
);

router.get("/getallproperties", authMiddlware, getAllOwnerPropertiesController);

router.get("/getallbookings", authMiddlware, getAllBookingsController);

router.post("/handlebookingstatus", authMiddlware, handleAllBookingstatusController);

router.delete(
  "/deleteproperty/:propertyid",
  authMiddlware,
  deletePropertyController
);

router.patch(
  "/updateproperty/:propertyid",
  upload.single("propertyImage"),
  authMiddlware,
  updatePropertyController
);

module.exports = router;