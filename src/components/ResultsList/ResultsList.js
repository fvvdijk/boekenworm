import React from "react";
import styles from "./ResultsList.module.css";
import ResultItem from "../shared/ResultItem/ResultItem";

const ResultsList = ({ works }) => {
    return (
        <div className={styles["results-list"]}>
            {works && works.length > 0 ? (
                <div>
                    <h4>Resultaten:</h4>
                    <ul>
                        {works.map((work, index) => (
                            <ResultItem key={index} work={work} />
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={styles["error-message"]}>
                    <p>Er zijn geen resultaten gevonden, probeer het opnieuw.</p>
                </div>
            )}
        </div>
    );
};

export default ResultsList;