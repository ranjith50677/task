import mongoose, { Mongoose } from "mongoose";

const assginment =  new mongoose.Schema({ 
    AssginmentName: {
        type: String,
        required: true
    },
    Assginmenttype:{
        type:String,
        required: true
    },
    subject:{
        type:String,
        required: true
    },
    
},{
    timestamps:true
});


const Assginment=mongoose.model('Assginment',assginment)
export default Assginment;