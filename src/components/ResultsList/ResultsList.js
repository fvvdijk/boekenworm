import React from "react";
import styles from "./ResultsList.module.css"

const extractOLID = (key) => {
    // Remove the "/works/" part from the key and trim any spaces
    return key.replace('/works/','');
};

const ResultsList = ({ works }) => {
    return (
        <div className={styles['results-list']}>
            {works && works.length > 0 ? (
                <div>
                    <h4>Resultaten:</h4>
                    <ul>
                        {works.map((work, index) => (
                            <li key={index} className={styles['user-list-item']}>
                                <img
                                    src={`https://covers.openlibrary.org/b/id/${work.cover_id}-L.jpg`}
                                    alt={`${work.title} cover`}
                                    style={{
                                        width: "200px",
                                        height: "300px",
                                        objectFit: "cover",
                                    }}
                                    onError={(e) => console.error("Image loading error:", e)}
                                />
                                <h3> {work.title} </h3>
                                <p> {work.author_name || (work.authors?.[0]?.name) || "Unknown Author"} </p>
                                <a href={`https://openlibrary.org/books/${extractOLID(work.key)}`} target="_blank" rel="noopener noreferrer">
                                    Extra info
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className={styles['error-message']}>
                    <p>Er zijn geen resultaten gevonden, probeer het opnieuw.</p>
                </div>
            )}
        </div>
    );
};

export default ResultsList;