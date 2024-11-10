const propertyschema=require('../schemas/propertyModel');
const userSchema=require('../schemas/usermodel');
const bookingSchema=require('../schemas/bookmodel')

const getAllUserController = async (req, res) => {
  try {
     const alluser = await userSchema.find({});
     if (alluser.length === 0) {
        return res.status(401).send({
           success: false,
           message: "No users present"
        });
     } else {
        return res.status(200).send({
           success: true,
           message: "All users",
           data: alluser,
        });
     }
  } catch (error) {
     console.log("Error in get All Users Controller ", error);
     return res.status(500).send({
        success: false,
        message: "Internal Server Error"
     });
  }
};

const handleStatusController = async (req, res) => {
  const { userid, status } = req.body;
  try {
     const user = await userSchema.findByIdAndUpdate(
        userid,
        { granted: status },
        { new: true }
     );
     return res.status(200).send({
        success: true,
        message: `User has been ${status}`,
     });
  } catch (error) {
     console.log("Error in handleStatusController ", error);
     return res.status(500).send({
        success: false,
        message: "Internal Server Error"
     });
  }
};

const getAllPropertycontroller = async (req, res) => {
  try {
     const allProperties = await propertyschema.find({});

     if (!allProperties || allProperties.length === 0) {
        return res.status(401).send({
           success: false,
           message: "No properties present"
        });
     } else {
        return res.status(200).send({
           success: true,
           message: "All properties",
           data: allProperties,
        });
     }
  } catch (error) {
     console.log("Error in getAllPropertycontroller: ", error);
     return res.status(500).send({
        success: false,
        message: "Internal Server Error"
     });
  }
};

const getallbookingcontroller = async (req, res) => {
  try {
     const allBookings = await bookingSchema.find({});

     if (!allBookings || allBookings.length === 0) {
        return res.status(401).send({
           success: false,
           message: "No bookings present"
        });
     } else {
        return res.status(200).send({
           success: true,
           message: "All bookings",
           data: allBookings,
        });
     }
  } catch (error) {
     console.log("Error in getallbookingcontroller: ", error);
     return res.status(500).send({
        success: false,
        message: "Internal Server Error"
     });
  }
};

module.exports = {
  getAllUserController,
  handleStatusController,
  getAllPropertycontroller,
  getallbookingcontroller,
  
};
