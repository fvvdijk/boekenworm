import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import styles from './Navigation.module.css';
import Logout from '../Logout/Logout';

function Navigation() {
    const { user } = useAuth();

    return (
        <nav>
            <ul className={styles['navigation-bar']}>
                <li>
                    <NavLink to="/">Home</NavLink>
                </li>
                {user && (
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
                            <Logout />
                        </li>
                        <li>
                           <p>Je bent ingelogd!</p>
                        </li>
                    </>
                )}
                {!user && (
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
                )}
            </ul>
        </nav>
    );
}

export default Navigation;