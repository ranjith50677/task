import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import route from './router/users.js';
import question from './router/questions.js';
import assginment from './router/Assginment.js';

const app = express()
const port = process.env.PORT || 2000
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
mongoose.set('strictQuery', false);
mongoose.connect('mongodb://127.0.0.1:27017/Task')
.then(() => console.log('Connected to MongoDB...'))
.catch(err => console.error('Could not connect to MongoDB... '+err.message));
app.use(express.json());
 
app.get("/",(req,res)=>{
    res.send("Welcome to HRMS task2")
}) 
app.use("/user",route) 
// app.use("/assginment",assginment) 
// app.use("/question",question) 


app.listen(port, () => console.log('server running on  '+port));
