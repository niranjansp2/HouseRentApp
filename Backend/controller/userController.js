const propertyschema=require('../schemas/propertyModel');
const userSchema=require('../schemas/usermodel');
const bookingSchema=require('../schemas/bookmodel');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");



const registercontroller=async(req,res)=>{
    try {
        let granded="";
        const exitsUser=await userSchema.findOne({
            email:req.body.email
        });
        if(exitsUser){
            return res.status(200).send({message:"user already exites",
                success:false
            });
        }
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        req.body.password = hashedPassword;


        if(req.body.type==="Owner"){
            granded="ungranted";
            const newuser=new userSchema({...req.body,granded});
            await newuser.save();
        }else{
            const newuser=new userSchema(req.body);
            await newuser.save();
        } 
    return res.status(201).send({ message: "Register Success", success: true });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .send({ success: false, message: `${error.message}` });
    }
};



const logincontroller=async(req,res)=>{
    try {
        const user = await userSchema.findOne({ email: req.body.email });
        if (!user) {
          return res
            .status(200)
            .send({ message: "User not found", success: false });
        }
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
          return res
            .status(200)
            .send({ message: "Invalid email or password", success: false });
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, {
          expiresIn: "1d",
        });
        user.password = undefined;
        return res.status(200).send({
          message: "Login success successfully",
          success: true,
          token,
          user: user,
        });
      } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, message: `${error.message}` });
      }
}



const forgetpasswordcontroller=async(req,res)=>{
    try {
        const { email, password } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
    
        const updatedUser = await userSchema.findOneAndUpdate(
          { email },
          { password: hashedPassword },
          { new: true }
        );
    
        if (!updatedUser) {
          return res
            .status(200)
            .send({ message: "User not found", success: false });
        }
    
        await updatedUser.save();
        return res.status(200).send({
          message: "Password changed successfully",
          success: true,
        });
    } catch (error) {
        console.log(error);
        return res
          .status(500)
          .send({ success: false, message: `${error.message}` });
      }
}



const authcontroller=async(req,res)=>{
    console.log(req.body);
    try {
        const user = await userSchema.findOne({ _id: req.body.userId });
        console.log(user);
        if (!user) {
        return res
            .status(200)
            .send({ message: "user not found", success: false });
        } else {
        return res.status(200).send({
            success: true,
            data: user,
        });
        }
    } catch (error) {
        console.log(error);
        return res
        .status(500)
        .send({ message: "auth error", success: false, error });
    }
}


const getallpropertycontroller=async(req,res)=>{
    try {
            const allProperties = await propertyschema.find({});
            if (!allProperties) {
            throw new Error("No properties available");
            } else {
            res.status(200).send({ success: true, data: allProperties });
            }
        } catch (error) {
            console.log(error);
            return res
            .status(500)
            .send({ message: "auth error", success: false, error });
        }
}
const bookingHandlecontroller=async(req,res)=>{
    const { propertyid } = req.params;
    const { userDetails, status, userId, ownerId } = req.body;

    try {
        const booking = new bookingSchema({
        propertyId: propertyid,
        userID: userId,
        ownerID: ownerId, 
        userName: userDetails.fullName,
        phone: userDetails.phone,
        bookingStatus: status,
        });

        await booking.save();

        return res
        .status(200)
        .send({ success: true, message: "Booking status updated" });
    } catch (error) {
        console.error("Error handling booking:", error);
        return res
        .status(500)
        .send({ success: false, message: "Error handling booking" });
    }
}
const getallbookingcontroller=async(req,res)=>{
    const { userId } = req.body;
    try {
        const getAllBookings = await bookingSchema.find();
        const updatedBookings = getAllBookings.filter(
        (booking) => booking.userID.toString() === userId
        );
        return res.status(200).send({
        success: true,
        data: updatedBookings,
        });
    } catch (error) {
        console.error(error);
        return res
        .status(500)
        .send({ message: "Internal server error", success: false });
    }
}



module.exports={
    registercontroller,
    logincontroller,
    forgetpasswordcontroller,
    authcontroller,
    getallpropertycontroller,
    getallbookingcontroller,
    bookingHandlecontroller
}