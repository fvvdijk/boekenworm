import React, { useState } from "react";
import styles from "./SearchBar.module.css";
import { useNavigate } from "react-router-dom";
import  {DNA} from "react-loader-spinner";
import {useAuth} from "../../../helpers/context/ApiContext";


function SearchBar() {
    const [loading, setLoading] = useState(false);
    const [query, setQuery] = useState('');
    const [noResults, setNoResults] = useState(false); // State to track no results
    const navigate = useNavigate();
    const { fetchBooks } = useAuth();

    async function searchBooks(query) {
        try {
            setLoading(true);
            const response = await fetchBooks(query);
            setLoading(false);
            return { success: response.status === 200, data: response.data };
        } catch (error) {
            console.error('Error fetching data from the API:', error.message);
            setLoading(false);
            return { success: false, error };
        }
    }

    async function onFormSubmit(e) {
        e.preventDefault();

        try {
            const { success, data } = await searchBooks(query);

            if (success) {
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
    if (loading) {
        return <DNA type="Puff" color="#00BFFF" height={100} width={100} />;;
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