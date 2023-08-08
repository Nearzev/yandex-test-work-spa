// App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Header from './Components/Header/Header';
import RequireAuth from './hoc/RequireAuth';
import Login from './Pages/LoginPage/Login';
import MainPage from './Pages/MainPage/MainPage';
import PrivatePage from './Pages/PrivatePage/PrivatePage';
import Register from './Pages/RegisterPage/Register';

const App: React.FC = () => {
    return (
        <Router>
            <Header />
            <Routes>
                <Route path="/" Component={MainPage} />
                <Route
                    path="/private"
                    element={
                        <RequireAuth>
                            <PrivatePage />
                        </RequireAuth>
                    }
                />
                <Route path="/register" Component={Register} />
                <Route path="/login" Component={Login} />
            </Routes>
        </Router>
    );
};

export default App;
