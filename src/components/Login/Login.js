import React, { useState } from 'react';
import { useAuth } from '../../helpers/context/AuthContext';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import Button from "../shared/button/Button";

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const { login, user } = useAuth();
    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'username') {
            setUsername(value);
        }
        if (id === 'password') {
            setPassword(value);
        }
    };

    const handleLogin = async () => {
        try {
            if (user) {
                setErrorMessage('Je bent al ingelogd.');
                return;
            }

            const { user: loggedInUser, token } = await login(username, password);

            navigate("/UserPage");
        } catch (error) {
            console.error('Login error:', error.message);
            setErrorMessage('Oeps, probeer het nog eens.');
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={styles['login-form']}>
            <div className="form-body">
                <div className="username">
                    <label className="form__label" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="form__input"
                        type="text"
                        value={username}
                        onChange={handleInputChange}
                        id="username"
                        placeholder="Your Username"
                        onKeyPress={handleEnterKeyPress}
                    />
                </div>
                <div className="password">
                    <label className="form__label" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="form__input"
                        type="password"
                        id="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="Password"
                        onKeyPress={handleEnterKeyPress}
                    />
                </div>
            </div>
            <div className="footer">
                <Button onClick={handleLogin} type="button" className="btn">
                    Login
                </Button>
                {errorMessage && (
                    <div className={styles['error-message-container']}>
                        <p className={styles['error-message']}>{errorMessage}</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default LoginForm;