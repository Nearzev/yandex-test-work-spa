import { body } from "express-validator"

export const registerValidation = [
    body('username', 'Неверное имя пользователя').isLength({min: 5}),
    body('password', 'Пароль должен быть минимум 5 символов').isLength({min: 5}),
    body('avatarUrl', 'Неверная сыдка на аватарку').optional().isURL(),
];