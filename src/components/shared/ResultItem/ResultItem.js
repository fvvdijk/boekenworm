import React from "react";
import styles from "../../resultsList/ResultsList.module.css";

const extractOLID = (key) => {
    return key.replace("/works/", "");
};

const ResultItem = ({ work }) => {
    const { cover_id, title, author_name, authors, key } = work;

    const author = author_name || (authors?.[0]?.name) || "Unknown Author";

    return (
        <li className={styles["user-list-item"]}>
            <img
                src={`https://covers.openlibrary.org/b/id/${cover_id}-L.jpg`}
                alt={`${title} cover`}
                style={{ width: "200px", height: "300px", objectFit: "cover" }}
                onError={(e) => console.error("Image loading error:", e)}
            />
            <h3>{title}</h3>
            <p>{author}</p>
            <a href={`https://openlibrary.org/books/${extractOLID(key)}`} target="_blank" rel="noopener noreferrer">
                Extra info
            </a>
        </li>
    );
};

 export default ResultItem;