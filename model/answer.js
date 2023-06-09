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

    AnswerSheet:[
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
    Attend:{
        type:String,
        required: true,
        enum:["Attented","Not Attented"]
    },
    totalMark:{
        type:Number,
    }
    })

const Answer=mongoose.model('Answer',answer)
export default Answer;