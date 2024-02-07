import React from "react";
import {useLocation} from "react-router-dom";
import styles from "./Lijstpagina.module.css";

const extractOLID = (key) => {
    // Remove the "/works/" part from the key and trim any spaces
    return key.replace('/works/','');
};

const ListPage = () => {
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;

    return (
        <div className={styles['list-page']}>
            <h1>Zoekresultaten</h1>

            {searchResults && searchResults.docs.length > 0 ? (
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
                                {/* Accessing the author_name from the editions object */}
                                {/* Additional information as needed */}
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div>
                <p>Er zijn nu nog geen resultaten, ga naar de searchbar op de homepage</p>
                </div>
                )}
        </div>
    );
};

export default ListPage;