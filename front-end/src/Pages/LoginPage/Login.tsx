import axios from 'axios';
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IInput } from '../..//Types/AuthTypes';
import Form from '../../Components/Form/Form';

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from?.pathname || '/';

    const InputProps: Array<IInput> = [
        {
            id: 1,
            name: 'username',
            type: 'text',
            placeholder: 'Username',
            errorMessage:
                'Имя пользователя должно состоять из 3-20 символов и не должно содержать никаких специальных знаков!',
            label: 'Username',
            pattern: '^[A-Za-z0-9]{3,20}$',
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
    ];

    const FormProps = {
        buttonText: 'Войти',
        linkTo: '/register',
        pText: 'Зарегистрируйтесь',
    };

    const [inputValues, setInputValues] = useState({
        username: localStorage.getItem('username') || '',
        password: localStorage.getItem('password') || '',
    });

    const onFormSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        const apiUrl = 'http://localhost:4444/login';
        axios
            .post(apiUrl, inputValues)
            .then((response) => {
                const token = response.data.token;
                localStorage.setItem('token', token);
                navigate(fromPage); // Используем navigate для перенаправления
            })
            .catch((error) => {
                console.error('Ошибка авторизации:', error);
            });
    };

    return (
        <>
            <Form
                InputProps={InputProps}
                InputValues={inputValues}
                setInputValues={setInputValues}
                buttonText={FormProps.buttonText}
                linkTo={FormProps.linkTo}
                pText={FormProps.pText}
                onSubmit={onFormSubmit}
            />
        </>
    );
};

export default Login;
