
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt'
import { validationResult } from "express-validator"
import UserModel from '../Models/User.js';

import dotenv from 'dotenv';

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

export const register =  async (req, res) => {
    try {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json(errors.array())
        }
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
    
        const doc = new UserModel({
            username: req.body.username,
            passwordHash: hash,
        });
    
        const user = await doc.save();

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            SECRETKEY,
            {
                expiresIn: '30d',
            },
        );
        
        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось зарегистрироваться',
        });
    }
};

export const login =  async (req, res) => {
    try {
        const user = await UserModel.findOne({ username: req.body.username });

        if(!user) {
            return res.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash);

        if(!isValidPass) {
            return req.status(404).json({
                message: 'Неверный логин или пароль',
            });
        }

        const token = jwt.sign(
            {
                _id: user._id,
            }, 
            SECRETKEY,
            {
                expiresIn: '30d',
            },
        );

        const {passwordHash, ...userData} = user._doc;

        res.json({
            ...userData,
            token,
        });

    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const isAuth =  async(req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user) {
            return res.status(401).json({
                message: 'Вы не авторизованы'
            }
            );
        }

        const {passwordHash, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'Вы не авторизованы',
        });
    }
};