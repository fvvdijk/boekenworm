import React, {useEffect, useState} from 'react';
import styles from "./BookDetails.module.css"
import {useNavigate, useParams} from 'react-router-dom';
import Alert from "../../components/shared/notification/Alert";
import {useAuth} from "../../helpers/context/ApiContext";
import Button from "../../components/shared/button/Button";
import {DNA} from "react-loader-spinner";

const BookDetails = () => {
    const { id, author } = useParams();
    const navigate = useNavigate();
    const [book, setBook] = useState(null);
    const corsAllowed = localStorage.getItem('cors');
    const [alert, setAlert] = useState({
        message: '',
        type: '',
        visible: false
    });
    const { fetchBookDetails } = useAuth();

    const showAlert = (message, type) => {
        setAlert({ message, type, visible: true });
    };

    const closeAlert = () => {
        setAlert({ ...alert, visible: false });
    };
    const getBookDetails = async () => {
        try {
            const response = await fetchBookDetails(id).catch((err)=>{
                showAlert('Er is wat misgelopen!', 'alert-error');
                setTimeout(()=>{
                    closeAlert()
                },4000);
            });
            setBook(response.data);
            showAlert('Data ontvangen!', 'alert-success');
            setTimeout(()=>{
                closeAlert()
            },2000);
        } catch (e) {
            setTimeout(()=>{
                if(!corsAllowed){
                    getPermission();
                }
                navigate("/");
            },3000);
        }
    }
    const getPermission = () => {
        if(!corsAllowed){
            window.location.href = 'https://cors-anywhere.herokuapp.com/corsdemo';
            window.onload = function() {
                const button = document.querySelectorAll('button[type="submit"]');
                button.click();
                localStorage.setItem('cors', true);
                window.location.href = 'http://localhost:3000/ListPage';
            };
        }
    }
    useEffect(() => {
        getBookDetails();
    }, [id]);

    return (
        <article className={styles.bookDetails}>
            {!corsAllowed &&  <Button disabled={true} type="button" children={"Enable Cors"}>Cors enabled</Button>}
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
        </article>
    );
};

export default BookDetails;