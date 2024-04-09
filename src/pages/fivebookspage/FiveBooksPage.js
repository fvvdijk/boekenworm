import React from "react";
import { useLocation } from "react-router-dom";
import ResultsList from "../../components/ResultsList/ResultsList";
import styles from "./FiveBooksPage.module.css"
const FiveBooksPage = () => {
    const location = useLocation();
    const { works } = location.state || {};

    return (
        <section className={styles['five-books']}>
            <h1>5 boeken:</h1>
            {works ? (
                <ResultsList works={works} />
            ) : (
                <p>Nog geen resultaten, ga naar de userpage</p>
            )}
        </section>
    );
};

export default FiveBooksPage;