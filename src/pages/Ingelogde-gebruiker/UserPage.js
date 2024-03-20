import React, { useState } from "react";
import { useAuth } from "../../components/Context/AuthContext";
import Questionnaire from "../../components/Filtersysteem/FilterSystem";
import FiveBooksPage from "../5-boeken/5-boeken";
import RandomBookPage from "../Willekeurig-boek/RandomBookPage";
import styles from "./UserPage.module.css";
import QuestionnaireTwo from "../../components/Filtersysteem/FilterSystem2";

function UserPage() {
    const user = useAuth();
    console.log('user:', user);

    const [bookOptions, setBookOptions] = useState([]);

    const handleBookOptions = (options) => {
        setBookOptions(options);
    };

    const renderBookOptions = () => {
        if (bookOptions.length > 0) {
            return (
                <article>
                    <h2>Result:</h2>
                    <FiveBooksPage bookOptions={bookOptions} />
                    <RandomBookPage bookOptions={bookOptions} />
                </article>
            );
        }
        return null;
    };

    return (
        <article className={styles.userpage}>
            <h1>Je bent ingelogd!</h1>
            <div className={styles['personality-tests']}>
                <Questionnaire onBookOptionsChange={handleBookOptions} />
                <QuestionnaireTwo onBookOptionsChange={handleBookOptions} />

                {renderBookOptions()}
            </div>
        </article>
    );
}

export default UserPage;