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
            console.log(response)
            setSuccessMessage('Registratie succesvol! Je wordt nu naar de homepage geleid.');
            setTimeout(()=>{
                navigate("/");
            },4000);
        } catch (error) {
            console.error(error?.response?.data);
            setErrorMessage(error?.response?.data || 'Registration failed');
        }
    };

    return (
        <div className={styles['register-form']}>
            <form onSubmit={(e) => e.preventDefault()} className={styles["form-style"]}>
                <div className={styles.container}>
                    <h1>Registratie</h1>
                    <p>Vul deze velden in en druk op enter om een account aan te maken.</p>
                    <hr />
                    <label htmlFor="name"><b>Naam</b></label>
                    <input type="text" placeholder="Naam" name="name" id="name" required onChange={(e) => handleInputChange(e)}></input>
                    <label htmlFor="password"><b>Wachtwoord</b></label>
                    <input type="password" placeholder="Wachtwoord" name="password" id="password" required onChange={(e) => handleInputChange(e)}></input>
                    <label htmlFor="email"><b>Email</b></label>
                    <input type="text" placeholder="Email" name="email" id="email" required onChange={(e) => handleInputChange(e)}></input>
                    <hr />
                    <Button type="submit" className="registerbtn" onClick={handleSubmit}>Account aanmaken</Button>
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
                    <p>Heb je al een account? <Link to="/">Log in</Link>.</p>
                </div>
                <div>
                    <ul>
                        <h4>Voorwaarden:</h4>
                        <li>Naam moet minimaal 4 karakters bevatten</li>
                        <li>Wachtwoord moet minimaal 8 karakters bevatten</li>
                        <li>Email moet bestaan</li>
                    </ul>
                </div>
            </form>
        </div>
    );
}

export default RegistrationForm;