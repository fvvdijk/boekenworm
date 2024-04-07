import React, { useState } from 'react';
import axios from 'axios';
import styles from './Register.module.css';

function RegistrationForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const apikey = 'boekenworm:byfOaBewbNje38gcGoHw';

    const handleInputChange = (e) => {
        const { id, value } = e.target;
        if (id === 'name') {
            setName(value);
        } else if (id === 'password') {
            setPassword(value);
        } else if (id === 'email') {
            setEmail(value);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(
                'https://api.datavortex.nl/boekenworm/users',
                {
                    username: name,
                    password: password,
                    email: email,
                    info: null,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Api-Key': apikey,
                    },
                }
            );
            setSuccessMessage('Registration successful!');
        } catch (error) {
            console.error(error.response.data);
            setErrorMessage(error.response.data || 'Registration failed');
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={styles['register-form']}>
            <form onSubmit={(e) => e.preventDefault()}>
                <div className={styles['form-body']}>
                    <div>
                        <div className="username">
                            <label className="form__label" htmlFor="name">
                                Name
                            </label>
                            <input
                                className="form__input"
                                type="text"
                                value={name}
                                onChange={(e) => handleInputChange(e)}
                                id="name"
                                placeholder="Your Name"
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
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Password"
                                onKeyPress={handleEnterKeyPress}
                            />
                        </div>
                        <div className="email">
                            <label className="form__label" htmlFor="email">
                                Email
                            </label>
                            <input
                                className="form__input"
                                type="email"
                                id="email"
                                value={email}
                                onChange={(e) => handleInputChange(e)}
                                placeholder="Email"
                                onKeyPress={handleEnterKeyPress}
                            />
                        </div>
                    </div>
                    <div className="footer">
                        <button type="button" onClick={handleSubmit} className="btn">
                            Register
                        </button>
                    </div>
                    {successMessage && (
                        <div className={styles['success-message-container']}>
                            <p className={styles['success-message']}>{successMessage}</p>
                        </div>
                    )}
                    {errorMessage && (
                        <div className={styles['error-message-container']}>
                            <p className={styles['error-message']}>{errorMessage}</p>
                        </div>
                    )}
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;