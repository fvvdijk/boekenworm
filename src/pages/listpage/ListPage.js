import React from "react";
import {Link, useLocation} from "react-router-dom";
import styles from "./ListPage.module.css";

const extractOLID = (key) => {
    return key.replace("/works/", "")
};
const renderSearchResults = (searchResults) => {
    if (searchResults && searchResults.docs.length > 0) {
        return (
            <article>
                <ul className={styles['list-page']}>
                    {searchResults.docs.slice(0, 30).map((book) => (
                        <li key={book.key} className={styles['list-item']}>
                            <figure>
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
                            </figure>
                            <h3>{book.title}</h3>
                            <p>
                                {book.author_name} {" "}
                                    <Link to={`/bookDetails/${book.author_name}/${extractOLID(book?.key)}`} id={extractOLID(book?.key)}>
                                    Extra info
                                    </Link>
                            </p>
                        </li>
                    ))}
                </ul>
            </article>
        );
    }
    return (
        <article>
            <p>Er zijn nu nog geen resultaten, ga naar de searchbar op de homepage</p>
        </article>
    );
};

const ListPage = () => {
    const location = useLocation();
    const searchResults = location.state && location.state.searchResults;
    return (
        <section className={styles['list-section']}>
            <h1>Zoekresultaten</h1>

            {renderSearchResults(searchResults)}
        </section>
    );
};

export default ListPage;