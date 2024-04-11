import React from "react";
import SearchBar from "../../components/shared/searchbar/SearchBar";
import LoginForm from "../../components/Login/Login";
import Button from "../../components/shared/button/Button";
import styles from './HomePage.module.css';
import {useNavigate} from "react-router-dom";

function HomePage() {
    const navigate = useNavigate();

    const navigateTo = () => {
        navigate("/RegisterPage");
    };

    return (
        <section className={styles['homepage-container']}>
            <h1>Welkom op Boekenworm.nl!</h1>
            <h3>De beste online boekenkast van Nederland</h3>
            <hr />
            <SearchBar />
            <hr />
            <article className={styles['centered-content']}>
                <LoginForm />
                <div className={styles['reg-button']}>
                    <p>Nog geen account? klik dan op: </p>
                    <Button  type="button" onClick={navigateTo} label="Registreren" to="/RegisterPage" children={"Register"}>
                        Registreren
                    </Button>
                </div>
            </article>
            <article>
                <p>https://cors-anywhere.herokuapp.com/corsdemo</p>
            </article>
        </section>
    );
}

export default HomePage;