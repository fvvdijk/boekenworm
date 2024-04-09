import React from 'react'

const InputComponent = ({ value, onChange }) => {
        return (
            <input
                type="text"
                value={value}
                onChange={onChange}
            />
        );
    };

export default InputComponent