import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/context/ApiContext';
import styles from "../shared/searchbar/SearchBar.module.css";

const Logout = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
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