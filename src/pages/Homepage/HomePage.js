import React from "react";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import LoginForm from "../../components/Login/LoginForm";
import Button from "../../components/shared/button/Button";
import { useAuth } from "../../context/AuthContext";
import styles from './HomePage.module.css';
import {useNavigate} from "react-router-dom";

function HomePage() {
    const user = useAuth();
    console.log(user);
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate("/RegisterPage");
    };

    return (
        <section className={styles['homepage-container']}>
            <h1>Welkom op Boekenworm.nl!</h1>
            <h3>De beste online boekenkast van Nederland</h3>

            <SearchBar />

            <article className={styles['centered-content']}>
                <LoginForm />
                <Button onClick={navigateTo} label="Registreren" to="/RegisterPage" />
            </article>
        </section>
    );
}

export default HomePage;