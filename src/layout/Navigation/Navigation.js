import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../helpers/context/AuthContext';
import styles from './Navigation.module.css';

function Navigation() {
    const { user } = useAuth();

    const loggedInLinks = (
        <>
            <li>
                <NavLink to="/UserPage">UserPage</NavLink>
            </li>
            <li>
                <NavLink to="/FiveBooksPage">FiveBooksPage</NavLink>
            </li>
            <li>
                <NavLink to="/RandomBookPage">RandomBookPage</NavLink>
            </li>
            <li>
                <p>Je bent ingelogd!</p>
            </li>
        </>
    );

    const loggedOutLinks = (
        <>
            <li>
                <NavLink to="/RegisterPage">RegisterPage</NavLink>
            </li>
            <li>
                <NavLink to="/ListPage">ListPage</NavLink>
            </li>
            <li>
                <p>Log in op de homepage!</p>
            </li>
        </>
    );

    return (
        <nav>
            <ul className={styles['navigation-bar']}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {user ? loggedInLinks : loggedOutLinks}
            </ul>
        </nav>
    );
}

export default Navigation;