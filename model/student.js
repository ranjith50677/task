import mongoose from "mongoose";

const user =  new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
   faculty:{ 
    type:Boolean,
    default:false
   }
});


const User=mongoose.model('User',user)
export default User;