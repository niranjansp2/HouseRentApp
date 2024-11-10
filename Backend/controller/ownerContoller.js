const propertyschema = require('../schemas/propertyModel');
const userSchema = require('../schemas/usermodel');
const bookingSchema = require('../schemas/bookmodel');

const addPropertyController = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    req.body.propertyAmt = Number(req.body.propertyAmt);
    
    if (!req.body.propertyType || !req.body.propertyAdType) {
      return res.status(400).send({
        success: false,
        message: "Property type and advertisement type are required",
      });
    }

    let images = [];
    if (req.files) {
      images = req.files.map((file) => ({
        filename: file.filename,
        path: `/uploads/${file.filename}`,
      }));
    }

    const user = await userSchema.findById(req.body.userId);
    if (!user) {
      return res.status(400).send({
        success: false,
        message: "User not found",
      });
    }

    const newPropertyData = new propertyschema({
      ...req.body,
      propertyImage: images,
      ownerId: user._id,
      ownerName: user.name,
      isAvailable: "Available",
    });

    const newProperty = await newPropertyData.save();
    return res.status(200).send({
      success: true,
      message: "New Property has been stored",
      data: newProperty,
    });
  } catch (error) {
    console.error("Error in addPropertyController", error);
    return res.status(500).send({
      message: "Error adding property",
      success: false,
    });
  }
};

const getAllOwnerPropertiesController = async (req, res) => {
  try {
    const userId = req.userId; // assume userId is set from token middleware
    const properties = await propertyschema.find({ ownerId: userId });
    return res.status(200).send({
      success: true,
      data: properties,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

const deletePropertyController = async (req, res) => {
  try {
    await propertyschema.findByIdAndDelete(req.params.propertyid);
    return res.status(200).send({
      success: true,
      message: "The property has been deleted",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

const updatePropertyController = async (req, res) => {
  try {
    const updatedProperty = await propertyschema.findByIdAndUpdate(
      req.params.propertyid,
      { ...req.body, ownerId: req.body.userId },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "Property updated successfully.",
      data: updatedProperty,
    });
  } catch (error) {
    console.error("Error updating property:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update property.",
    });
  }
};

const getAllBookingsController = async (req, res) => {
  try {
    const userId = req.userId; // assume userId is set from token middleware
    const bookings = await bookingSchema.find({ ownerID: userId });
    return res.status(200).send({
      success: true,
      data: bookings,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

const handleAllBookingstatusController = async (req, res) => {
  try {
    const { bookingId, propertyId, status } = req.body;
    await bookingSchema.findByIdAndUpdate(
      bookingId,
      { bookingStatus: status },
      { new: true }
    );

    await propertyschema.findByIdAndUpdate(
      propertyId,
      { isAvailable: status === 'booked' ? 'Unavailable' : 'Available' },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: `Changed the status of property to ${status}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ message: "Internal server error", success: false });
  }
};

module.exports = {
  addPropertyController,
  getAllOwnerPropertiesController,
  deletePropertyController,
  updatePropertyController,
  getAllBookingsController,
  handleAllBookingstatusController,
};
