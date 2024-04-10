import React from 'react';

function Button({ onClick, children }) {
    return (
        <button onClick={onClick} className={'make-large'}>
            {children}
        </button>
    );
}

export default Button;
