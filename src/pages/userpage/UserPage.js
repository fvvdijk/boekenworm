import React, {useState, useEffect} from "react";
import Questionnaire from "../../components/questionnaire/Questionnaire";
import styles from "./UserPage.module.css";
import {useParams} from 'react-router-dom';

function UserPage() {
    const { id, author } = useParams();
    const randomOffset = Math.floor(Math.random() * 100);
    const [bookOptions] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);

    useEffect(() => {
        setRefreshKey(oldKey => oldKey + 1);
    }, []);

    const renderBookOptions = () => {
        if (bookOptions.length > 0) {
            return (
                <article>
                    {/*<h2>Result:</h2>*/}
                    {/*/!*<FiveBooksPage/>*!/*/}
                    {/*/!*<RandomBookPage/>*!/*/}
                </article>
            );
        }
        return null;
    };

    return (
        <article className={styles["user-page"]}>
            <h1>Je bent ingelogd!</h1>
            <div className={styles["personality-tests"]}>
                <Questionnaire limit={5}/>
                <hr />
                <Questionnaire randomOffset={randomOffset} limit={1} />
                {renderBookOptions()}
            </div>
        </article>
    );
}

export default UserPage;

