import React, { useState } from 'react';
import styles from './Register.module.css';
import Button from "../shared/button/Button";
import {Link, useNavigate} from "react-router-dom";
import {useAuth} from "../../helpers/context/ApiContext";

function RegistrationForm() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();
    const { register } = useAuth();


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
            const response = await register(name, password, email);
            setSuccessMessage('Registration successful!');
            setTimeout(()=>{
                navigate("/");
            },3000);
        } catch (error) {
            console.error(error?.response?.data);
            setErrorMessage(error?.response?.data || 'Registration failed');
        }
    };

    const handleEnterKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className={styles['register-form']}>
            <form onSubmit={(e) => e.preventDefault()} className={styles["form-style"]}>
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr />

                        <label htmlFor="name"><b>Name</b></label>
                    <input type="text" placeholder="Enter name" name="name" id="name" required onChange={(e) => handleInputChange(e)}></input>

                    <label htmlFor="password"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="password" id="password" required onChange={(e) => handleInputChange(e)}></input>

                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Enter email" name="email" id="email" required onChange={(e) => handleInputChange(e)}></input>

                    <hr />
                                        <Button type="submit" className="registerbtn" onClick={handleSubmit}>Register</Button>
                </div>
              <div>  {successMessage && (
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
                <div className="container signin">
                    <p>Already have an account? <Link to="/">Sign in</Link>.</p>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;