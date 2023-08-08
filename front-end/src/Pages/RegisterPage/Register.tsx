import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Form from '../../Components/Form/Form';
import { IInput } from '../../Types/AuthTypes';

const Register = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';
    const USER_REGEX = /^[A-Za-z0-9]{3,16}$/;
    const PASSWORD_REGEX =
        /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    const errorMessages = {
        valuesError: 'Введенные данные не верны',
        serverError: 'No Server Response',
        usernameTakenError: 'Username Taken',
        registrationError: 'Registration Failed',
    };

    const [InputValues, setInputValues] = useState({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
        confirmPassword: localStorage.getItem('confirmPassword') || '',
    });

    const FormProps = {
        buttonText: 'Зарегистрироваться',
        linkTo: '/login',
        pText: 'Войти',
    };

    const InputProps: Array<IInput> = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage:
                'Имя пользователя должно состоять из 3-16 символов и не должно содержать никаких специальных знаков!',
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,16}$',
            required: true,
        },
        {
            id: 2,
            name: 'password',
            type: 'password',
            placeholder: 'Password',
            errorMessage:
                'Пароль должен состоять из 8-20 символов и включать как минимум 1 букву, 1 цифру и 1 специальный знак!',
            label: 'Password',
            pattern:
                '^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$',
            required: true,
        },
        {
            id: 3,
            name: 'confirmPassword',
            type: 'password',
            placeholder: 'Confirm Password',
            errorMessage: 'Пароли не совпадают!',
            label: 'Confirm Password',
            pattern: InputValues.password,
            required: true,
        },
    ];

    const onFormSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();

        const firstCheck = USER_REGEX.test(InputValues.username);
        const secondCheck = PASSWORD_REGEX.test(InputValues.password);

        if (!firstCheck || !secondCheck) {
            alert(errorMessages.valuesError);
            return;
        }
        try {
            const apiUrl = 'http://localhost:4444/register';
            axios
                .post(apiUrl, InputValues)
                .then((response) => {
                    const token = response.data.token;
                    localStorage.setItem('token', token);
                    navigate(fromPage); // Используем navigate для перенаправления
                })
                .catch((error) => {
                    console.error('Ошибка регистрации:', error);
                });
        } catch (err) {
            if (err) {
                alert('No Server Response');
            }
        }
    };

    return (
        <div>
            <Form
                onSubmit={onFormSubmit}
                InputProps={InputProps}
                InputValues={InputValues}
                setInputValues={setInputValues}
                buttonText={FormProps.buttonText}
                linkTo={FormProps.linkTo}
                pText={FormProps.pText}
            />
        </div>
    );
};

export default Register;
