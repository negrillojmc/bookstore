import express, { response } from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from './models/bookModel.js';
import booksRoute from './routes/booksRoute.js';
import cors from 'cors';

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get('/', (req, res)=> {
    console.log(request)
    return res.status(234).send('Welcome to MERN Stack Tutorial')
});

// Middleware for handling CORS policy
// Option 1: Allow All Origins with Default of cors(*)
// app.use(cors());
// Option 2: Allow Custom Origins
app.use(
    cors({
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type'],
    })
)

app.use('/books', booksRoute);

mongoose
.connect(mongoDBURL)
.then(() => {
    console.log('App is connected to the database.') 
    app.listen(PORT, () => {
        console.log(`App is listening to port ${PORT}`);
    })
    })
    .catch((err) => {
        console.log(err)
    })