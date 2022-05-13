import dotenv from "dotenv"
import express from 'express';
import mongoose from 'mongoose';

import todoRouter from './routes/todo.js';


dotenv.config();
//routes


const app = express();
const PORT = process.env.PORT || 3000;



const uri = process.env.MONGO_URI;

app.listen(PORT, () => {
    console.log(`listening on http://localhost:${PORT}`);
    //connecto to db
    mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true }).then(_ => {
            console.log('connected to db');
        })
        .catch(err => {
            console.log('connect error', err);
        });
});

// json middleware
app.use(express.json());

// routing for public directory
app.use(express.static('public'));

//static
app.use('/todo', todoRouter)

// catch 404
app.use((req, res, next) => {

    let err = new Error('Please check end point and try again');
    err.status = 404;
    next(err);
});