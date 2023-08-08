import './Header.css';

import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        checkAuthentication();
    }, [location]);

    const checkAuthentication = () => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuthenticated(true);
        } else {
            setAuthenticated(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        setAuthenticated(false);
        navigate('/');
    };

    return (
        <div className="header">
            <nav>
                <ul className="nav">
                    <li className="navItem">
                        <Link className="link" to="/">
                            Главная
                        </Link>
                    </li>
                    <li className="navItem">
                        <Link className="link" to="/private">
                            Ресурсы
                        </Link>
                    </li>
                </ul>
            </nav>
            <div className="button-wrapper">
                {authenticated ? (
                    <button className="button" onClick={handleLogout}>
                        Выход
                    </button>
                ) : (
                    <>
                        <button className="button">
                            <Link className="link" to="/register">
                                Регистрация
                            </Link>
                        </button>
                        <button className="button">
                            <Link className="link" to="/login">
                                Авторизация
                            </Link>
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default Header;
