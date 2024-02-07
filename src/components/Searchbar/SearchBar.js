import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false); // State to track no results
    const navigate = useNavigate();

    async function onFormSubmit(e) {
        e.preventDefault();

        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,author_key,cover_i`);
            const data = await response.json();

            if (response.ok) {
                console.log('API Response:', data);

                if (data.numFound === 0) {
                    setNoResults(true);
                // Redirect to ListPage and pass the search results as state
                } else {
                    navigate("/ListPage", { state: { searchResults: data } });
                    setNoResults(false); // Reset noResults state
                }
            } else {
                console.error(`API Request failed with status ${response.status}:`, data);
                setNoResults(true); // Set noResults state to true
            }
        } catch (error) {
            console.error('Error fetching data from the API:', error.message);
            setNoResults(true); // Set noResults state to true
        }
    }

    return (
        <div>
            <form className={styles.searchbar} onSubmit={onFormSubmit}>
            <input
                type="text"
                name="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Zoek op auteur, boektitel of op isbn"
            />

            <button type="submit">
                Zoek
            </button>
        </form>
            {noResults && (
                <p className={styles.noResultsMessage}>Geen resultaten gevonden, probeer het opnieuw.</p>
            )}
        </div>
    );
}

export default SearchBar;