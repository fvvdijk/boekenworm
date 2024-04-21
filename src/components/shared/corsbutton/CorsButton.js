import React from 'react';
import Button from "../button/Button";

const CorsButton = ({ url }) => {
    const handleClick = () => {
        window.location.href = url;
    };

    return (
        <Button onClick={handleClick}>
            Corsdemo
        </Button>
    );
};

export default CorsButton;