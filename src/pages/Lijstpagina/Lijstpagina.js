import React from "react";
import { useLocation } from "react-router-dom";
import styles from "./Lijstpagina.module.css";

const extractOLID = (key) => {
    return key.replace('/works/', '');
};

const renderSearchResults = (searchResults) => {
    if (searchResults && searchResults.docs.length > 0) {
        return (
            <div>
                <ul>
                    {searchResults.docs.slice(0, 30).map((book) => (
                        <li key={book.key} className={styles['list-item']}>
                            <img
                                src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`}
                                alt={`${book.title} cover`}
                                style={{
                                    width: "200px",
                                    height: "300px",
                                    objectFit: "cover",
                                }}
                                onError={(e) => console.error("Image loading error:", e)}
                            />
                            <h3>{book.title}</h3>
                            <p>
                                {book.author_name} {" "}
                                <a href={`https://openlibrary.org/books/${extractOLID(book.key)}`} target="_blank" rel="noopener noreferrer">
                                    Extra info
                                </a>
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    return (
        <div>
            <p>Er zijn nu nog geen resultaten, ga naar de searchbar op de homepage</p>
        </div>
    );
};

const ListPage = () => {
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;

    return (
        <div className={styles['list-page']}>
            <h1>Zoekresultaten</h1>

            {renderSearchResults(searchResults)}
        </div>
    );
};

export default ListPage;