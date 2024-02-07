import React from "react";
import { useNavigate } from "react-router-dom";

function Button({ label, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(to);
    };

    return (
        <button onClick={handleClick}>
            {label}
        </button>
    );
}

export default Button;