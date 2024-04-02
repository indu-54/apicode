// // models/user.js

// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//     firstName: { type: String, required: true },
//     lastName: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     confirmpassword: { type: String, required: true },
//     mobileNumber: { type: String, required: true },
//     address: { type: String, required: true },
//     otp: { type: String },
    
    
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const usermodelSchema = new mongoose.Schema({


    firstname: {type: String, required: true, },
    lastname: {type: String, required: true,},
    email: {type: String,required: true,unique: true,},
    passwordHash: { type: String, required: true,},
    confirmpasswordHash: {  type: String, required: true, },
    mobileNumber: { type: String, required: true,},
    address: {type: String,required: true,},
    otp: { type: String,},
   
});

module.exports = mongoose.model('UserModel', usermodelSchema);

