import jwt from "jsonwebtoken";

import dotenv from 'dotenv';

dotenv.config();

const SECRETKEY = process.env.SECRETKEY;

export const checkAuth = (req, res, next) => {
    const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

    if(token) {
        try {
            const decoded = jwt.verify(token, SECRETKEY);

            req.userId = decoded._id;
            next();
        } catch (err) {
            return res.status(403).json({
                message: 'Нет доступа'
            });
        }
    } else {
        return res.status(401).json({
            message: 'Нет доступа'
        });
    }
};