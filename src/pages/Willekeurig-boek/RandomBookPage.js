import React from "react";
import { useLocation } from "react-router-dom";
import ResultsList from "../../components/ResultsList/ResultsList";
import styles from "./RandomBookPage.module.css"

const RandomBookPage = () => {
    const location = useLocation();
    const { works } = location.state || {};

    return (
        <section className={styles['random-book']}>
            <h1>Willekeurig Boek</h1>
            {works ? (
                <ResultsList works={works} />
            ) : (
                <p>Nog geen resultaten, ga naar de userpage</p>
            )}
        </section>
    );
};

export default RandomBookPage;
