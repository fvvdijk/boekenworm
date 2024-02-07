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

    return (
        <div className={styles.userpage}>
            <h1>Je bent ingelogd!</h1>
            <div className={styles['personality-tests']}>
                {/* Pass handleBookOptions as a prop to the Questionnaire component */}
                <Questionnaire onBookOptionsChange={handleBookOptions} />
                <QuestionnaireTwo onBookOptionsChange={handleBookOptions} />

                {bookOptions.length > 0 && (
                    <div>
                        <h2>Result:</h2>
                        <FiveBooksPage bookOptions={bookOptions} />
                        <RandomBookPage bookOptions={bookOptions} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default UserPage;
