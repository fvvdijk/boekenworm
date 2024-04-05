import React, {useEffect, useState} from 'react';
import styles from "./Book.module.css"
import { useParams } from 'react-router-dom';
import axios from "axios";

const BookDetails = () => {
    const { id, author } = useParams();
    const [book, setBook] = useState(null);
    const getBookDetails = async () => {
        const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://openlibrary.org/books/${id}.json`);
        setBook(response.data);
    }
    useEffect(() => {
        getBookDetails();
    }, [id]);

    return (
        <div className={styles.bookDetails}>
            <h2 className={styles.title}>{book?.title}</h2>
            <div className={styles.detail}><strong>Last Modified:</strong> <span>{book?.last_modified.value}</span></div>
            <div className={styles.detail}><strong>Latest Revision:</strong> <span>{book?.latest_revision}</span></div>
            <div className={styles.detail}><strong>Authors:</strong> <span>{author}</span></div>
            <div className={styles.detail}><strong>Created:</strong> <span>{book?.created.value}</span></div>
            <div className={styles.detail}><strong>Subject Places:</strong> <span>{book?.subject_places ? book?.subject_places.join(', ') : "unknown"}</span></div>
            <div className={styles.detail}><strong>Subjects:</strong> <span>{book?.subjects? book?.subjects.join(', ') : "unknown"}</span></div>
            <div className={styles.detail}><strong>Subject People:</strong> <span>{book?.subject_people? book?.subject_people.join(', ') : "unknown"}</span></div>
            <div className={styles.detail}><strong>Revision:</strong> <span>{book?.revision}</span></div>
        </div>
    );
};

export default BookDetails;