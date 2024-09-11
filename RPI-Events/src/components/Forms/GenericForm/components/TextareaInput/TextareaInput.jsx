import React from 'react';
// import './FormInput.css';

const TextareaInput = ({ label, name, value, onChange, placeholder, required }) => {
    return (
        <div>
            <label className="inputfield">
                {label}
                <textarea
                    name={name}
                    value={value}
                    onChange={(e) => onChange(name, e.target.value)}
                    placeholder={placeholder}
                    required={required}
                />
            </label>
            <br />
        </div>
    );
};

export default TextareaInput;
