import axios from 'axios';
import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const RequireAuth = ({ children }) => {
    const location = useLocation();
    const [auth, setAuth] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const apiUrl = 'http://localhost:4444/me';
                const token = localStorage.getItem('token');
                if (token) {
                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                    const response = await axios.get(apiUrl);
                    setAuth(true);
                } else {
                    setAuth(false);
                }
            } catch (error) {
                console.error('Ошибка проверки авторизации:', error);
                setAuth(false);
            } finally {
                setLoading(false);
            }
        };

        checkAuth();
    }, []);

    if (loading) {
        return <div>Загрузка.....</div>;
    }

    if (!auth) {
        return <Navigate to="/login" state={{ from: location }} />;
    }

    return children;
};

export default RequireAuth;
