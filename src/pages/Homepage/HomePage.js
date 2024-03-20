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
        <section className={styles['homepage-container']}>
            <h1>Welkom op Boekenworm.nl!</h1>
            <h3>De beste online boekenkast van Nederland</h3>

            <SearchBar />

            <article className={styles['centered-content']}>
                <LoginForm />
                <Button label="Registreren" to="/RegisterPage" />
            </article>
        </section>
    );
}

export default HomePage;