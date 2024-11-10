const mongoose = require("mongoose");
const propertySchema = new mongoose.Schema({
    propertyType: { 
        type: String, 
        required: [true, 'Please provide a property type'] 
    },
    propertyAdType: { 
        type: String, 
        required: [true, 'Please provide a property advertisement type'] 
    },
    propertyAddress: { 
        type: String, 
        required: [true, 'Please provide a property address'] 
    },
    ownerContact: { 
        type: String, 
        required: [true, 'Please provide owner contact'] 
    },
    propertyAmt: { 
        type: Number, 
        required: [true, 'Please provide property amount'] 
    },
    additionalInfo: { 
        type: String ,
        default: '',
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User' 
    },
    
}, { timestamps: true });

const Propertymodel= mongoose.model('Property', propertySchema);


module.exports = Propertymodel;
