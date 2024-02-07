import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import styles from "../Searchbar/SearchBar.module.css";

const Logout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    console.log(user);

    const handleLogout = () => {
        // Call the logout function from the AuthContext
        logout();

        // Redirect to the home page or any other desired page
        navigate('/');
    };

    return (

        <div>
            {user ? (
                <button onClick={handleLogout} type="button">
                    Logout
                </button>
            ) : (
                <p className={styles.noAccountError}>Je bent uitgelogd</p>
            )}
        </div>
    );
};

export default Logout;