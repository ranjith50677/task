import mongoose from "mongoose";

const answer=  new mongoose.Schema({ 
    userId:
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
        AssginmentId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Assginment",
          },
    QuestionpaperId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Question",
          },
    write:[
        {
       questionNo:{
        type:Number,
        required: true
        },
       Answer:{
        type:String,
        required: true
        },
    }
    ],
    totalMark:{
        type:Number,
    }
    })

const Answer=mongoose.model('Answer',answer)
export default Answer;