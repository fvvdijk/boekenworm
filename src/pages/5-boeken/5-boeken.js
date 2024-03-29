import React from "react";
import { useLocation } from "react-router-dom";
import ResultsList from "../../components/ResultsList/ResultsList";
import styles from "./5-boeken.module.css"
const FiveBooksPage = () => {
    const location = useLocation();
    const { works } = location.state || {};

    return (
        <div className={styles['five-books']}>
            <h1>5 boeken:</h1>
            {works ? (
                <ResultsList works={works} />
            ) : (
                <p>Nog geen resultaten, ga naar de userpage</p>
            )}
        </div>
    );
};

export default FiveBooksPage;