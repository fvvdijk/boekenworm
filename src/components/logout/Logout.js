import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../helpers/context/ApiContext';
import styles from "../shared/searchbar/SearchBar.module.css";
import Button from "../shared/button/Button";

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
                <Button onClick={handleLogout} type="button">
                    Logout
                </Button>
            ) : (
                <p className={styles.noAccountError}>Je bent uitgelogd</p>
            )}
        </div>
    );
};

export default Logout;