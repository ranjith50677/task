import mongoose from "mongoose";

const question = new mongoose.Schema({
  userId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  AssginmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assginment",
  },
  ques: [
    {
      questionNo: {
        type: Number,
        required: true,
      },
      question: {
        type: String,
        required: true,
      },
      options: [
        {
          optionNo: {
            type: String,
            required: true,
          },
          optionAns: {
            type: String,
            required: true,
          },
        },
      ],
      answer: {
        type: String,
        required: true,
      },
    },
  ],
  totaltestMark: {
    type: Number,
    required: true,
  },

});

const Question = mongoose.model("Question", question);
export default Question;
