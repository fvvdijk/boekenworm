import React from "react";
import { useLocation } from "react-router-dom";
import ResultsList from "../../components/resultslist/ResultsList";
import styles from "./QuizResultsPage.module.css"
const QuizResultsPage = () => {
    const location = useLocation();
    const { works } = location.state || {};

    return (
        <section className={styles['five-books']}>
            <h1>Resultaten:</h1>
            {works ? (
                <ResultsList works={works} />
            ) : (
                <p>Nog geen resultaten, ga naar de userpage</p>
            )}
        </section>
    );
};

export default QuizResultsPage;