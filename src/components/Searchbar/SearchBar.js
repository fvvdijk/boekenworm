import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";

function SearchBar() {
    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false); // State to track no results
    const navigate = useNavigate();

    async function searchBooks(query) {
        try {
            const response = await fetch(`https://openlibrary.org/search.json?q=${query}&fields=key,title,author_name,author_key,cover_i`);
            const data = await response.json();

            return { success: response.ok, data };
        } catch (error) {
            console.error('Error fetching data from the API:', error.message);
            return { success: false, error };
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        try {
            const { success, data } = await searchBooks(query);

            if (success) {
                console.log('API Response:', data);

                if (data.numFound === 0) {
                    setNoResults(true);
                } else {
                    navigate("/ListPage", { state: { searchResults: data } });
                    setNoResults(false); // Reset noResults state
                }
            } else {
                console.error('API Request failed:', data.error);
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