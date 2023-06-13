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
      
      name:{
            type:String,
            required: true
            },
      class:{
            type:String,
            required: true
            },
      subject:{
            type:String,
            required: true
            },
    AnswerSheet:[
        {
       questionNo:{
        type:Number,
    
        },
       Answer:{
        type:String,
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