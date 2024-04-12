import React from 'react';
import './Alert.module.css'
import styles from "./Alert.module.css";
const Alert = ({ message, type }) => {
    return (
        <container className={styles.alert}>
            <div className={`alert ${type}`}>
            {message}
        </div>
        </container>
            );
};

export default Alert;