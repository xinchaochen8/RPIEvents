import React from 'react';
// import './FormInput.css';

const TextInput = ({ label, name, value, onChange, placeholder, required }) => {
    return (
        <div>
            <label className="inputfield">
                {label}
                <input
                    type="text"
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

export default TextInput;
