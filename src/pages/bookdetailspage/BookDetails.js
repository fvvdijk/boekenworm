import React, {useEffect, useState} from 'react';
import styles from "./BookDetails.module.css"
import {useNavigate, useParams} from 'react-router-dom';
import axios from "axios";
import Alert from "../../components/shared/notification/Alert";

const BookDetails = () => {
    const { id, author } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const [alert, setAlert] = useState({
        message: '',
        type: '',
        visible: false
    });

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
    };

    const closeAlert = () => {
        setAlert({ ...alert, visible: false });
    };
    const getBookDetails = async () => {
        try {
            const response = await axios.get(`https://cors-anywhere.herokuapp.com/https://openlibrary.org/books/${id}.json`).catch((err)=>{
                showAlert('This is a error message!', 'alert-error');
                setTimeout(()=>{
                    closeAlert()
                },3000);
            });
            setBook(response.data);
            showAlert('This is a success message!', 'alert-success');
            setTimeout(()=>{
                closeAlert()
            },3000);
        } catch (e) {
            setTimeout(()=>{
                navigate("/");
            },3000);

        }

    }
    useEffect(() => {
        getBookDetails();
    }, [id]);

    return (
        <div className={styles.bookDetails}>
            {alert.visible && (
                <Alert
                    message={alert.message}
                    type={alert.type}
                    onClose={closeAlert}
                />
            )}
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