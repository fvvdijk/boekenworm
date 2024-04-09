import React from 'react';
import './Alert.module.css'
const Alert = ({ message, type }) => {
    return (
        <div className={`alert ${type}`}>
            {message}
        </div>
    );
};

export default Alert;