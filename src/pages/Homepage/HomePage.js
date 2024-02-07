import React from "react";
import SearchBar from "../../components/Searchbar/SearchBar";
import LoginForm from "../../components/Login/Login";
import Button from "../../components/Button/Button";
import { useAuth } from "../../components/Context/AuthContext";
import styles from './Homepage.module.css';

function HomePage() {
    const user = useAuth();
    console.log(user);

    return (
        <div className={styles['homepage-container']}>
            <h1>Welkom op Boekenworm.nl!</h1>
            <h2>De beste online boekenkast van Nederland</h2>

            <SearchBar />

            <div className={styles['centered-content']}>
                <LoginForm />
                <Button label="Registreren" to="/RegisterPage" />
            </div>

            <p>Hello123 FabianDijk</p>
        </div>
    );
}

export default HomePage;