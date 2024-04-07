import React, {useState} from "react";
import { useAuth } from "../../services/Context/AuthContext";
import Questionnaire from "../../components/Filtersysteem/Questionnaire";
import FiveBooksPage from "../5-boeken/5-boeken";
import RandomBookPage from "../Willekeurig-boek/RandomBookPage";
import styles from "./UserPage.module.css";

function UserPage() {
    const user = useAuth();
    const randomOffset = Math.floor(Math.random() * 100);
    const [bookOptions, setBookOptions] = useState([]);

    const renderBookOptions = () => {
        if (bookOptions.length > 0) {
            return (
                <article>
                    <h2>Result:</h2>
                    <FiveBooksPage/>
                    <RandomBookPage/>
                </article>
            );
        }
        return null;
    };

    return (
        <article className={styles.userpage}>
            <h1>Je bent ingelogd!</h1>
            <div className={styles['personality-tests']}>
                <Questionnaire limit={5}/>
                <Questionnaire randomOffset={randomOffset} limit={1} />

                {renderBookOptions()}
            </div>
        </article>
    );
}

export default UserPage;