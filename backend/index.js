import express, { request } from 'express';
import mongoose from 'mongoose';
import { checkAuth } from './utils/CheckAuth.js';
import { authValidation } from './validations/auth.js';
import { isAuth, login, register } from './controllers/UserController.js';
import cors from 'cors';

import dotenv from 'dotenv';

dotenv.config();

const DBUrl = process.env.MONGODBURL;

mongoose.connect(DBUrl)
.then(() => console.log('DB ok'))
.catch((err) => console.log('DB err', err));

const app = express();

app.use(express.json());
app.use(cors());

app.post('/register', authValidation, register)

app.post('/login', authValidation, login);

app.get('/me', checkAuth, isAuth);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    } else {
        console.log('ok')
    }
});