import React from "react";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import LoginForm from "../../components/Login/Login";
import Button from "../../components/shared/button/Button";
import { useAuth } from "../../services/Context/AuthContext";
import styles from './Homepage.module.css';
import {useNavigate} from "react-router-dom";

function HomePage() {
    const user = useAuth();
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
                <Button onClick={navigateTo} label="Registreren" to="/RegisterPage" children={"Register"}/>
            </article>
        </section>
    );
}

export default HomePage;